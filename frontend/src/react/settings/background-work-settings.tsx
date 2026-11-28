import { useQuery } from '@tanstack/react-query';
import { SettingsRow } from '@/components/application/settings/settings-rows';
import { Switch } from '@/components/base/switch/switch';

import { apiGet, apiSend } from '../../api';
import { t } from '../../i18n';
import { QueryErrorNote } from '../components/query-error-note';
import { queryClient } from '../query';
import { ErrorText, Rows, Section, Stack } from './section';
import { useAction } from './use-action';

const URL = '/api/configuration/background-work';
const KEY = ['background-work-settings'];
interface BackgroundWork { precompute: boolean }

export function BackgroundWorkSettings({ receipt }: { receipt(message: string): void }) {
  const query = useQuery({ queryKey: KEY, queryFn: ({ signal }) => apiGet<BackgroundWork>(URL, signal) });
  const action = useAction();
  const choose = (precompute: boolean) => void action.run('save',
    (signal) => apiSend<BackgroundWork>(URL, { precompute }, 'POST', signal),
    (saved) => {
      queryClient.setQueryData(KEY, saved);
      receipt(t('settings:shared.settingsSaved'));
    });
  return (
    <Section id="backgroundWork" title={t('settings:backgroundWork.title')}>
      <Rows>
        <SettingsRow label={t('settings:backgroundWork.precompute')} description={t('settings:backgroundWork.precomputeHelp')}>
          <Switch aria-label={t('settings:backgroundWork.precompute')} isSelected={query.data?.precompute ?? false}
            isDisabled={!query.data || Boolean(action.busy)} onChange={choose} />
        </SettingsRow>
      </Rows>
      {query.error ? <Stack divided><QueryErrorNote titleKey="settings:backgroundWork.loadFailed" query={query} /></Stack> : null}
      {action.error ? <Stack divided><ErrorText>{action.error}</ErrorText></Stack> : null}
    </Section>
  );
}
