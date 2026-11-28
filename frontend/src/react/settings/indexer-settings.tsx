/* 用户自配索引器；地址和 API key 分开保存，读取时只返回凭据是否存在。 */
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { RiDeleteBinLine } from '@remixicon/react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/base/buttons/button';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Input } from '@/components/base/input/input';
import { Switch } from '@/components/base/switch/switch';
import { apiGet, apiSend } from '../../api';
import { indexersSkeleton, rememberShape } from '../../configuration-skeleton';
import { randomId } from '../../core/random-id';
import { serverLabel } from '../../core/server-text';
import { Disclosure, ErrorText, ExternalLink, Footer, Help, Section, SectionSkeleton, Stack } from './section';
import { QueryErrorNote } from '../components/query-error-note';
import { busyProps, useAction } from './use-action';
import { t } from '../../i18n';
import { useFieldValidation } from './field-validation';

const URL = '/api/configuration/indexers';
interface Indexer {
  key: string; name: string; url: string; enabled: boolean; api_key_set: boolean;
  api_key?: string; clear_api_key?: boolean;
}
interface State { indexers: Indexer[]; max_indexers: number }
type IndexerField = 'name' | 'url' | 'api_key';
const INDEXER_FIELDS: IndexerField[] = ['name', 'url', 'api_key'];
const fieldKey = (row: Indexer, field: IndexerField) => `${row.key}-${field}`;

function indexerError(field: IndexerField, raw: string) {
  const value = raw.trim();
  if (field === 'name') return !value || value.length > 80 ? serverLabel('errors.resourceSearch.invalidIndexerName', '') : '';
  if (field === 'api_key') return value.length > 512 || /\s/.test(value)
    ? serverLabel('errors.resourceSearch.invalidApiKey', '') : '';
  if (value.length <= 2048 && /^https?:\/\/[^/?#@\\\s]+/i.test(value) && !/[?#\\\s]/.test(value)) {
    try {
      const url = new globalThis.URL(value);
      if (url.hostname && url.port !== '0' && !url.username && !url.password) return '';
    } catch { /* 地址或端口无法解析。 */ }
  }
  return serverLabel('errors.resourceSearch.endpointFormat', '');
}

export function IndexerSettings({ receipt }: { receipt(message: string): void }) {
  const query = useQuery({ queryKey: ['indexers'], queryFn: ({ signal }) => apiGet<State>(URL, signal), refetchOnMount: 'always' });
  if (query.error) return <QueryErrorNote titleKey="settings:indexers.loadFailed" query={query} />;
  if (query.isFetching) return <SectionSkeleton label={t('settings:indexers.loading')} html={indexersSkeleton} />;
  return query.data ? <IndexerForm initial={query.data} receipt={receipt} /> : null;
}

function hostOf(url: string): string {
  try {
    return new globalThis.URL(url).host;
  } catch {
    return url;
  }
}

function IndexerSummary({ row, index }: { row: Indexer; index: number }) {
  const facts = [row.url ? hostOf(row.url) : t('settings:indexers.noUrl'), row.enabled ? t('settings:shared.enabled') : t('settings:shared.disabled'),
    row.api_key_set && !row.clear_api_key ? t('settings:indexers.apiKeySaved') : row.api_key ? t('settings:indexers.apiKeyUnsaved') : t('settings:indexers.noApiKey')];
  return <span className="flex min-w-0 items-baseline gap-3">
    <span className="shrink-0 text-text-primary">{row.name || t('settings:indexers.defaultName', { index: index + 1 })}</span>
    <span className="truncate text-body-2-regular text-text-secondary">{facts.join(' · ')}</span>
  </span>;
}

function IndexerForm({ initial, receipt }: { initial: State; receipt(message: string): void }) {
  const [rows, setRows] = useState(initial.indexers);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const validation = useFieldValidation<string>();
  const action = useAction();
  /* 记下几条索引器、哪条展开，下次骨架照这个结构画。 */
  useEffect(() => { rememberShape('indexers', { open: initial.indexers.map(row => !row.url) }) }, [initial]);
  const update = (key: string, fields: Partial<Indexer>) =>
    setRows((current) => current.map((row) => row.key === key ? { ...row, ...fields } : row));
  const input = (row: Indexer, field: IndexerField) => {
    const key = fieldKey(row, field);
    const value = row[field] ?? '';
    return {
      'data-settings-field': key,
      value,
      isInvalid: Boolean(validation.errors[key]),
      validationBehavior: 'aria' as const,
      hint: validation.errors[key],
      onChange: (next: string) => { update(row.key, { [field]: next }); validation.update(key); },
      onBlur: () => { if (value) validation.update(key, indexerError(field, value)); },
    };
  };
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    const toOpen: Record<string, boolean> = {};
    for (const row of rows) {
      for (const field of INDEXER_FIELDS) {
        const error = indexerError(field, row[field] ?? '');
        if (!error) continue;
        errors[fieldKey(row, field)] = error;
        toOpen[row.key] = true;
      }
    }
    if (!validation.check(event.currentTarget, errors)) {
      setExpanded(current => ({ ...current, ...toOpen }));
      return;
    }
    void action.run('save', (signal) => apiSend<State>(URL, { indexers: rows }, 'POST', signal), (result) => {
      setRows(result.indexers);
      receipt(t('settings:indexers.saved'));
    });
  };
  return (
    <Section guide="indexers" title={t('settings:indexers.title')} onSubmit={save}>
      <Stack>
        <div className="flex min-w-0 flex-col gap-4">
        <Disclosure summary={t('settings:indexers.connectHelp')}><Help>{t('settings:indexers.helpText')}{' '}
          <ExternalLink href="https://github.com/peach-mitao/peach/blob/master/docs/RESOURCE_SEARCH.md">{t('settings:indexers.setupGuide')}</ExternalLink></Help>
        </Disclosure>
        {/* 一个索引器收成一行摘要：名称、地址主机、启用与凭据状态；点开才是那几栏输入。
            新加的一行（还没有地址）默认展开。 */}
        {rows.map((row, index) => (
          <div key={row.key} className="min-w-0 border-t border-separator-border pt-2">
            <Disclosure isOpen={expanded[row.key] ?? !initial.indexers.some(item => item.key === row.key && item.url)}
              onOpenChange={open => setExpanded(current => ({ ...current, [row.key]: open }))}
              summary={<IndexerSummary row={row} index={index} />}>
              <div className="flex min-w-0 flex-col gap-4">
                <Input label={t('settings:shared.name')} aria-label={t('settings:indexers.nameLabel', { index: index + 1 })} maxLength={80}
                  isDisabled={Boolean(action.busy)} {...input(row, 'name')} />
                <Input label={t('settings:indexers.torznabUrl')} aria-label={t('settings:indexers.torznabUrlLabel', { index: index + 1 })} type="url"
                  autoComplete="off" placeholder={t('settings:indexers.urlPlaceholder')} isDisabled={Boolean(action.busy)} {...input(row, 'url')} />
                <div className="flex min-w-0 flex-col gap-2">
                  <Input label="API key" aria-label={t('settings:indexers.apiKeyLabel', { index: index + 1 })} type="password" autoComplete="new-password"
                    placeholder={row.api_key_set ? t('settings:shared.savedLeaveBlank') : undefined}
                    isDisabled={Boolean(action.busy)} {...input(row, 'api_key')} />
                  {row.api_key_set ? <Checkbox isSelected={Boolean(row.clear_api_key)}
                    isDisabled={Boolean(action.busy)} onChange={(clear_api_key) => update(row.key, { clear_api_key })}>
                    {t('settings:indexers.clearApiKey')}
                  </Checkbox> : null}
                </div>
                <div className="flex min-h-10 items-center justify-between gap-3">
                  <Switch isSelected={row.enabled} isDisabled={Boolean(action.busy)}
                    onChange={(enabled) => update(row.key, { enabled })}>{t('settings:shared.enable')}</Switch>
                  <Button variant="secondary" type="button" size="small" leadingIcon={RiDeleteBinLine} disabled={Boolean(action.busy)}
                    aria-label={t('settings:indexers.removeLabel', { index: index + 1 })}
                    onClick={() => setRows(current => current.filter(item => item.key !== row.key))}>{t('settings:shared.remove')}</Button>
                </div>
              </div>
            </Disclosure>
          </div>
        ))}
        </div>
        {action.error ? <ErrorText>{action.error}</ErrorText> : null}
      </Stack>
      <Footer>
        <Button variant="secondary" type="button" disabled={Boolean(action.busy) || rows.length >= initial.max_indexers}
          onClick={() => setRows([...rows, { key: randomId(), name: '', url: '', enabled: true, api_key_set: false }])}>
          {t('settings:indexers.add')}
        </Button>
        <Button type="submit" {...busyProps(action.busy === 'save')}>{t('settings:shared.saveSettings')}</Button>
      </Footer>
    </Section>
  );
}
