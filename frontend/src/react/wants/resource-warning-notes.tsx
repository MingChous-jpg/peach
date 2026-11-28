import { Button, ButtonLink } from '@/components/base/buttons/button';
import { useId } from 'react';
import { serverLabel } from '../../core/server-text';
import { t } from '../../i18n';
import { Note } from '../components/note';
import { SiteMark } from '../components/site-mark';
import { resourceNotice, resourceSourceKey, sourceConnectionPath, sourceDisplayName } from './resource-display';

export interface ResourceWarnings {
  warnings?: string[];
  warning_codes?: (string | null)[];
  warning_params?: (Record<string, unknown> | null)[];
  warning_sources?: string[];
  connection_checks?: string[];
  retry_sources?: string[];
}

export function ResourceWarningNotes({ result, onRetry, busy }: {
  result: ResourceWarnings; onRetry?(source: string): void; busy?: string;
}) {
  const description = useId();
  const pending = new Set(result.connection_checks);
  const retries = new Set(result.retry_sources);
  return result.warnings?.map((warning, index) => {
    const code = result.warning_codes?.[index] ?? '';
    const params = result.warning_params?.[index];
    const text = resourceNotice(warning);
    const source = result.warning_sources?.[index] || (code.startsWith('labels.javdbPublic.') || code === 'labels.magnetChain.staleReused'
      ? 'javdb' : resourceSourceKey(String(params?.source || params?.label || '')));
    const informational = code === 'labels.javdbPublic.reviewPagesQueried'
      || code === 'labels.resourceSearch.allRejected' || text !== warning;
    const connection = !informational && pending.delete(source) ? (
      <ButtonLink variant="secondary" size="small" href={sourceConnectionPath(source)}>
        {t('manage:resourceSearch.openSourceConnection', { source: sourceDisplayName(source) })}
      </ButtonLink>
    ) : undefined;
    const retry = onRetry && !informational && retries.delete(source) ? (
      <Button variant="secondary" size="small" disabled={Boolean(busy)} aria-busy={busy === source}
        aria-describedby={`${description}-${index}`}
        onClick={() => onRetry(source)}>{t(busy === source ? 'manage:resourceSearch.searching' : 'manage:resourceSearch.retrySource')}</Button>
    ) : undefined;
    const action = retry && connection ? <span className="flex flex-wrap gap-2">{retry}{connection}</span> : retry ?? connection;
    return <Note key={index} tone={informational ? 'neutral' : 'error'} action={action}>
      <span className="inline-flex min-w-0 items-center gap-1.5">
        {source && !source.startsWith('indexer:') ? <SiteMark source={source} /> : null}
        <span id={`${description}-${index}`} className="min-w-0 wrap-anywhere">{serverLabel(code, text, params)}</span>
      </span>
    </Note>;
  });
}
