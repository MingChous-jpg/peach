import { useQuery } from '@tanstack/react-query';
import { apiGet, errorMessage } from '../../api';
import { interfaceLanguage, t } from '../../i18n';
import { Note } from '../components/note';
import { Disclosure, Section, Stack } from '../settings/section';

interface Stage {
  role: string;
  stage: string;
  status: string;
  elapsed_ms?: number;
}

interface State {
  available: boolean;
  pending: boolean;
  capture: { status: string; reason?: string; started_at?: number; stages: Stage[]; mounts?: Record<string, number> } | null;
}

export const startupStatusText: Record<string, string> = {
  capturing: t('manage:startupCapture.capturing'),
  completed: t('manage:startupCapture.completed'),
  failed: t('manage:startupCapture.failed'),
  interrupted: t('manage:startupCapture.interrupted'),
  running: t('manage:startupCapture.running'),
  unavailable: t('manage:startupCapture.unavailable'),
};

export const startupStageText: Record<string, string> = {
  container_preparation: t('manage:startupCapture.containerPreparation'),
  configuration: t('manage:startupCapture.configuration'),
  desktop_services: t('manage:startupCapture.desktopServices'),
  desktop_dependencies: t('manage:startupCapture.desktopDependencies'),
  ledger_migration: t('manage:startupCapture.ledgerMigration'),
  launch_services: t('manage:startupCapture.launchServices'),
  access: t('manage:startupCapture.access'),
  bind_listener: t('manage:startupCapture.bindListener'),
  assemble_web: t('manage:startupCapture.assembleWeb'),
  activate_ledger: t('manage:startupCapture.activateLedger'),
  mount_monitor: t('manage:startupCapture.mountMonitor'),
  mdns: t('manage:startupCapture.mdns'),
  tls: t('manage:startupCapture.tls'),
  http_redirect: t('manage:startupCapture.httpRedirect'),
  web_startup: t('manage:startupCapture.webStartup'),
};
const roleText: Record<string, string> = {
  desktop: t('manage:startupCapture.desktop'),
  supervisor: t('manage:startupCapture.supervisor'),
  web: t('manage:startupCapture.web'),
};

const reasonText: Record<string, string> = {
  restart_recovery: t('manage:startupCapture.restartRecovery'),
  update_verification: t('manage:startupCapture.updateVerification'),
  workflow_probe: t('manage:startupCapture.workflowProbe'),
};
const mountText: Record<string, string> = {
  ok: t('manage:startupCapture.mountReady'),
  missing: t('manage:startupCapture.mountMissing'),
  permission_denied: t('manage:startupCapture.mountDenied'),
  not_directory: t('manage:startupCapture.mountNotDirectory'),
  unavailable: t('manage:startupCapture.unavailable'),
  unmapped: t('manage:startupCapture.mountUnmapped'),
  checking: t('manage:startupCapture.mountChecking'),
  timeout: t('manage:startupCapture.mountTimeout'),
};
export const STARTUP_CAPTURE_KEY = ['startup-diagnostics'] as const;
export const fetchStartupCapture = (signal: AbortSignal) => apiGet<State>('/api/diagnostics/startup', signal);

export function StartupCapture() {
  const query = useQuery({
    queryKey: STARTUP_CAPTURE_KEY, queryFn: ({ signal }) => fetchStartupCapture(signal),
    refetchInterval: ({ state }) => state.data?.capture?.status === 'capturing' ? 2000 : false,
  });
  const capture = query.data?.capture;
  return <Section id="diagnostics-startup" title={t('manage:startupCapture.title')}>
    <Stack>
      <p className="text-body-regular text-text-secondary">{t('manage:startupCapture.description')}</p>
      {query.data?.pending ? <span role="status" className="text-body-regular text-text-primary">{t('manage:startupCapture.pending')}</span> : null}
      {query.isError || query.data?.available === false ? <Note tone="error">
        {query.isError ? errorMessage(query.error) : t('manage:startupCapture.readFailed')}
      </Note> : null}
      {query.data?.available && !capture ? <p className="text-body-regular text-text-secondary">{t('manage:startupCapture.empty')}</p> : null}
      {capture ? <Disclosure summary={t('manage:startupCapture.latest')} contentClassName="gap-2">
        <p className="text-body-medium text-text-primary">
          {startupStatusText[capture.status]}
          {capture.started_at ? ` · ${new Date(capture.started_at).toLocaleString(interfaceLanguage)}` : ''}
        </p>
        {capture.reason ? <p className="text-body-regular text-text-secondary">{reasonText[capture.reason]}</p> : null}
        {capture.stages.length ? <ul className="flex flex-col gap-1 text-body-regular text-text-secondary">
          {capture.stages.map((stage, index) => <li key={index}>
            {roleText[stage.role]} · {startupStageText[stage.stage]} · {startupStatusText[stage.status]}
            {stage.elapsed_ms !== undefined ? ` · ${t('manage:startupCapture.milliseconds', { count: stage.elapsed_ms })}` : ''}
          </li>)}
        </ul> : null}
        {capture.mounts && Object.keys(capture.mounts).length > 0 ? <div className="flex flex-col gap-1">
          <h4 className="text-body-medium text-text-primary">{t('manage:startupCapture.mountResults')}</h4>
          <ul className="flex flex-wrap gap-x-3 text-body-regular text-text-secondary">
            {Object.entries(capture.mounts).map(([key, count]) => <li key={key}>{mountText[key]} · {count}</li>)}
          </ul>
        </div> : null}
      </Disclosure> : null}
    </Stack>
  </Section>;
}
