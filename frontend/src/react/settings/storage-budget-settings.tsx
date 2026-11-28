import { useEffect, useState } from 'react';
import { Button } from '@/components/base/buttons/button';
import { SettingsRow } from '@/components/application/settings/settings-rows';
import { Switch } from '@/components/base/switch/switch';
import { Input } from '@/components/base/input/input';
import { ConfigurationInput } from '../components/configuration-fields';
import { apiGet, apiSend, errorMessage } from '../../api';
import type { StoragePolicy, StorageState } from '../bundle';
import { ErrorText, Footer, Help, Rows, Section, Stack } from './section';
import { busyProps, useAction } from './use-action';
import { codedText, serverLabelList } from '../../core/server-text';
import { t } from '../../i18n';
import { useFieldValidation } from './field-validation';

const NUMBERS = [
  ['minimum_free_gib', t('settings:storageLimits.reservedSpace'), t('settings:storageLimits.reservedSpaceHelp')],
  ['data_max_gib', t('settings:storageLimits.dataLimit'), t('settings:storageLimits.dataLimitHelp')],
  ['cache_max_gib', t('settings:storageLimits.cacheLimit'), t('settings:storageLimits.cacheLimitHelp')],
] as const;
type Limit = (typeof NUMBERS)[number][0] | 'external_cache_max_gib';
const limitError = (raw: string) => !raw.trim() || (/^\d+$/.test(raw.trim()) && Number(raw) <= 1048576)
  ? '' : t('settings:storageLimits.invalidLimit');

type LastCheck = NonNullable<NonNullable<StorageState['budget']>['last_check']>;
/** 触线原因按当前界面语言：`reason_codes` 与 `reasons` 同序，缺 code 的照原文。 */
const reasonTexts = (check: LastCheck) =>
  serverLabelList(check.reasons, check.reason_codes?.map(item => item?.code ?? null),
    check.reason_codes?.map(item => item?.params ?? null));

export function StorageBudgetSettings({ initial, after, receipt }: {
  initial: NonNullable<StorageState['budget']>;
  after(storage: StorageState): void;
  receipt(message: string): void;
}) {
  const [policy, setPolicy] = useState(initial.policy);
  const action = useAction(codedText(initial, 'error'));
  const [cacheRead, setCacheRead] = useState('');
  const [drafts, setDrafts] = useState<Partial<Record<Limit, string>>>({});
  const validation = useFieldValidation<Limit>();
  useEffect(() => {
    if (!policy?.enabled || initial.policy?.external_cache_path) return;
    const controller = new AbortController();
    setCacheRead(t('settings:storageLimits.readingCloudDrive'));
    void apiGet<{ path?: string; configured?: boolean }>('/api/configuration/storage/external-cache', controller.signal).then(result => {
      if (controller.signal.aborted) return;
      const path = result.path;
      if (!path) {
        setCacheRead(t('settings:storageLimits.cloudDriveMissing'));
        return;
      }
      setPolicy(current => current && !current.external_cache_path ? { ...current, external_cache_path: path } : current);
      setCacheRead(t('settings:storageLimits.cacheDetected'));
    }).catch(cause => {
      if (!controller.signal.aborted) setCacheRead(t('settings:storageLimits.cacheReadFailed', { error: errorMessage(cause) }));
    });
    return () => controller.abort();
  }, [policy?.enabled, initial.policy?.external_cache_path]);
  const update = <K extends keyof StoragePolicy>(key: K, value: StoragePolicy[K]) =>
    setPolicy(current => current ? { ...current, [key]: value } : current);
  const check = initial.last_check;
  if (!policy) return <Section title={t('settings:storageLimits.title')}><Stack><ErrorText>{action.error || t('settings:storageLimits.loadFailed')}</ErrorText></Stack></Section>;
  const limit = (key: Limit) => {
    const value = drafts[key] ?? (policy[key] ? String(policy[key]) : '');
    return {
      'data-settings-field': key,
      value,
      validationBehavior: 'aria' as const,
      isInvalid: Boolean(validation.errors[key]),
      hint: validation.errors[key],
      onBlur: () => validation.update(key, limitError(value)),
      onChange: (raw: string) => {
        setDrafts(current => ({ ...current, [key]: raw }));
        validation.update(key);
      },
    };
  };

  return <Section id="storageBudgetSettings" title={t('settings:storageLimits.title')} onSubmit={event => {
    event.preventDefault();
    const fields: Limit[] = policy.enabled ? NUMBERS.map(([key]) => key) : [];
    if (policy.enabled && policy.external_cache_path) fields.push('external_cache_max_gib');
    const errors = Object.fromEntries(fields.map(key => [key, limitError(limit(key).value)]));
    if (!validation.check(event.currentTarget, errors)) return;
    const updated = { ...policy, ...Object.fromEntries(fields.map(key => [key, Number(limit(key).value)])) };
    void action.run('save', signal => apiSend<StorageState>('/api/configuration/storage/policy', updated, 'POST', signal),
      result => { setDrafts({}); setPolicy(result.budget?.policy ?? updated); setCacheRead(''); after(result); receipt(t('settings:storageLimits.saved')); });
  }}>
    <Rows>
      <SettingsRow label={t('settings:storageLimits.enable')} description={t('settings:storageLimits.enableHelp')}>
        <Switch aria-label={t('settings:storageLimits.enable')} isSelected={policy.enabled} isDisabled={Boolean(action.busy)}
          onChange={value => update('enabled', value)} />
      </SettingsRow>
      {policy.enabled ? <>
      {NUMBERS.map(([key, label, description]) => <SettingsRow key={key} label={label} description={description}>
        <ConfigurationInput aria-label={t('settings:storageLimits.limitGib', { label })} unit="GiB" inputMode="numeric" pattern="[0-9]*" size="small"
          className="w-32 shrink-0" placeholder={key === 'minimum_free_gib' ? t('settings:shared.auto') : t('settings:shared.noLimit')}
          {...limit(key)}
          isDisabled={Boolean(action.busy)} />
      </SettingsRow>)}
      <SettingsRow label={t('settings:storageLimits.autoClean')} description={t('settings:storageLimits.autoCleanHelp')}>
        <Switch aria-label={t('settings:storageLimits.autoClean')} isSelected={policy.auto_clean} isDisabled={Boolean(action.busy)}
          onChange={value => update('auto_clean', value)} />
      </SettingsRow>
      </> : null}
    </Rows>
    {policy.enabled ? <Stack divided>
      <Input label={t('settings:storageLimits.externalCache')} hint={cacheRead || t('settings:storageLimits.externalCacheHelp')}
        value={policy.external_cache_path} size="small" className="w-full" placeholder={t('settings:shared.notSet')}
        onChange={value => update('external_cache_path', value)} isDisabled={Boolean(action.busy)} />
      {policy.external_cache_path ? <Rows>
        <SettingsRow label={t('settings:storageLimits.externalCacheLimit')} description={t('settings:storageLimits.externalCacheLimitHelp')}>
          <ConfigurationInput aria-label={t('settings:storageLimits.externalCacheLimitGib')} unit="GiB" size="small" className="w-32 shrink-0" placeholder={t('settings:shared.noLimit')}
            inputMode="numeric" pattern="[0-9]*" {...limit('external_cache_max_gib')} isDisabled={Boolean(action.busy)} />
        </SettingsRow>
      </Rows> : null}
      <Help>{t('settings:storageLimits.limitsHelp')}</Help>
      {check?.paused ? <ErrorText>{t('settings:storageLimits.pausedWithReasons', { reasons: reasonTexts(check).join(t('shell:format.semicolonSeparator')) })}</ErrorText> : null}
      {action.error ? <ErrorText>{action.error}</ErrorText> : null}
    </Stack> : action.error ? <Stack><ErrorText>{action.error}</ErrorText></Stack> : null}
    <Footer><Button type="submit" {...busyProps(action.busy === 'save')}>{t('settings:shared.saveSettings')}</Button></Footer>
  </Section>;
}
