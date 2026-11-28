import { useEffect, useId, useRef, useState, type MouseEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RiFileList3Line, RiLightbulbFlashLine, RiRssLine } from '@remixicon/react';
import { Popover } from 'react-aria-components';
import { Button } from '@/components/base/buttons/button';
import { Chip } from '@/components/base/badges/chip';
import { apiGet, apiSend, errorMessage } from '../api';
import { appSettingsStore } from '../appearance/settings';
import { codedText, serverLabelList } from '../core/server-text';
import { playbackPosition } from '../player/progress';
import { entityPath, realDuration } from '@peach/legacy/core';
import { t } from '../i18n';
import { backgroundIssuesInterval } from './activity/background-issues';
import { BACKGROUND_ISSUES_KEY, fetchBackgroundIssues, momentText, statusLabel, taskName, type BackgroundIssue, type TaskRunPayload } from './activity/tasks';
import { fetchResultUpdates, RESULT_UPDATES_KEY } from '../running-tasks';
import { MenuDialog } from './components/menu-dialog';
import { BoardNotificationCenter, type NotificationCenterAction, type NotificationCenterItem, type NotificationLink } from './components/board-notification-center';
import { busyProps } from './settings/use-action';
import type { ShellActions } from './router/shell-actions';
import type { FollowContext, FollowItem, FollowPage } from './follow-feed/follow-feed';
import { followCompactWhen, followTitle } from './follow-feed/follow-marks';
import type { Discovery } from './jav/jav';
import { fetchItem, itemKey } from './item-detail/item-detail';
import { startupStatusText, startupStageText } from './diagnostics/startup-capture';
import { TaskIcon } from './activity/task-icon';
import {
  NotificationArtwork, NotificationAssetMetadata, NotificationAuthorAvatar, NotificationFollowMetadata, NotificationPlaybackProgress,
  notificationAssetTitle, notificationFollowIdentity, type NotificationAsset,
} from './notification-media';

type Progress = { seconds: number; updated_at: number };
interface ResumeItem extends NotificationAsset {
  key: string; kind: 'item' | 'follow'; duration?: number;
  leave_ratio?: number; position?: Progress | null; post?: FollowItem;
}
interface Context {
  lan_without_password: boolean;
  startup?: { status: string; started_at?: number; finished_at?: number | null; issue_stage?: string | null } | null;
}
type Feed = Pick<FollowPage, 'groups' | 'sources' | 'author_aliases'>;
interface Recommendation { jav?: { items?: Discovery[] } | null }

const READ_KEY = 'peach.notification-center.seen.v1';
const readSeen = () => {
  try { return new Set<string>(JSON.parse(localStorage.getItem(READ_KEY) || '[]')); }
  catch { return new Set<string>(); }
};

const timeAt = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
const issueId = (issue: BackgroundIssue) => `${issue.key}:${issue.since || issue.noticed_at}`;

export function NotificationCenter({ actions, trigger }: { actions: ShellActions; trigger: HTMLButtonElement }) {
  const triggerRef = useRef(trigger);
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(readSeen);
  const title = t('shell:notifications.title');
  const issues = useQuery({ queryKey: BACKGROUND_ISSUES_KEY,
    queryFn: ({ signal }) => fetchBackgroundIssues(signal),
    refetchInterval: backgroundIssuesInterval });
  const rows = issues.data?.issues || [];
  const unread = rows.filter(issue => !seen.has(issueId(issue))).length;
  const triggerLabel = unread ? t('shell:notifications.unread', { count: unread }) : title;

  useEffect(() => {
    const toggle = () => setOpen(value => !value);
    trigger.addEventListener('click', toggle);
    trigger.disabled = false;
    return () => {
      trigger.removeEventListener('click', toggle);
      trigger.disabled = true;
    };
  }, [trigger]);
  useEffect(() => {
    trigger.title = title;
    trigger.setAttribute('aria-label', triggerLabel);
    trigger.setAttribute('aria-expanded', String(open));
    if (open) trigger.setAttribute('aria-controls', panelId);
    else trigger.removeAttribute('aria-controls');
  }, [open, panelId, title, trigger, triggerLabel]);

  const go = (path: string) => { setOpen(false); actions.navigate(path) };
  const remember = (keys: string[]) => {
    const next = new Set([...seen, ...keys].slice(-120));
    setSeen(next);
    try { localStorage.setItem(READ_KEY, JSON.stringify([...next])) } catch { /* The current view retains the marks. */ }
  };
  const linkFor = (href: string): NotificationLink => ({
    href, onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.button || event.altKey || event.shiftKey || event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      go(href);
    },
  });
  const actionLink = (href: string, label = t('shell:shared.open')): NotificationCenterAction => ({
    id: 'open', label, href, follow: linkFor(href).onClick,
  });
  const issueCards: NotificationCenterItem[] = rows.map(issue => ({
    id: issueId(issue), category: 'attention', status: 'error', title: codedText(issue, 'title'),
    timestamp: momentText(issue.since ?? issue.noticed_at), unread: !seen.has(issueId(issue)),
    actions: [actionLink(issue.href, codedText(issue, 'link_label'))],
    retry: issue.retry && issue.retry_available ? <RetryIssue url={issue.retry} /> : undefined,
  }));
  if (issues.error) issueCards.push({
    id: 'issue-feed-error', category: 'attention', status: 'error',
    title: t('shell:notifications.issuesUnavailable'), description: errorMessage(issues.error),
    retry: <Button size="small" variant="secondary" {...busyProps(issues.isFetching)}
      onClick={() => void issues.refetch()}>{t('shell:shared.retryNow')}</Button>,
  });

  return <>
    {unread > 0 ? <span data-notification-dot="" aria-hidden="true" /> : null}
    <Popover triggerRef={triggerRef} isOpen={open} onOpenChange={setOpen} placement="bottom end" offset={8}
      shouldCloseOnInteractOutside={element => !element.closest('[data-copy-editor]')}
      data-notification-menu="" className="peach-react overflow-hidden outline-none">
      <MenuDialog id={panelId} aria-label={title} data-copy-choice-host="" data-notification-dialog="" className="flex min-h-0 flex-col overflow-hidden outline-none">
        {open ? <NotificationCards actions={actions} issueCards={issueCards} loadingIssues={issues.isPending}
          actionLink={actionLink} linkFor={linkFor} close={() => setOpen(false)}
          onMarkAllRead={() => remember(rows.map(issueId))}
          suggest={!seen.has('lan-password')} dismissSuggestion={() => remember(['lan-password'])} /> : null}
      </MenuDialog>
    </Popover>
  </>;
}

function RetryIssue({ url }: { url: string }) {
  const client = useQueryClient();
  const retry = useMutation({ mutationFn: () => apiSend(url, {}),
    onSuccess: () => { void client.invalidateQueries({ queryKey: BACKGROUND_ISSUES_KEY }) } });
  return <>
    <Button size="small" variant="secondary" {...busyProps(retry.isPending)}
      onClick={() => retry.mutate()}>{t('shell:shared.retryNow')}</Button>
    {retry.error ? <p role="alert" className="mt-1 max-w-56 wrap-anywhere text-caption-1-regular text-text-secondary">{errorMessage(retry.error)}</p> : null}
  </>;
}

const timeOf = (seconds?: number) => seconds ? momentText(new Date(seconds * 1000).toISOString()) : undefined;

function NotificationCards({ actions, issueCards, loadingIssues, close, actionLink, linkFor, onMarkAllRead, suggest, dismissSuggestion }: {
  actions: ShellActions; issueCards: NotificationCenterItem[]; loadingIssues: boolean;
  close(): void; onMarkAllRead(): void;
  actionLink(href: string, label?: string): NotificationCenterAction;
  linkFor(href: string): NotificationLink;
  suggest: boolean; dismissSuggestion(): void;
}) {
  const resultUpdates = useQuery({ queryKey: RESULT_UPDATES_KEY, queryFn: ({ signal }) => fetchResultUpdates(signal), enabled: false }).data;
  const recent = useQuery({ queryKey: ['notification-recent-playback'],
    queryFn: ({ signal }) => apiGet<{ items: ResumeItem[] }>('/api/player/recent', signal), retry: false });
  const context = useQuery({ queryKey: ['notification-context'],
    queryFn: ({ signal }) => apiGet<Context>('/api/notification-context', signal), retry: false });
  const tasks = useQuery({ queryKey: ['notification-recent-tasks'],
    queryFn: ({ signal }) => apiGet<{ runs?: TaskRunPayload[] }>('/api/tasks?status=finished&limit=16', signal), retry: false });
  const followed = useQuery({ queryKey: ['notification-follow'],
    queryFn: ({ signal }) => apiGet<Feed>('/api/follow?sort=new&limit=3', signal), retry: false });
  const recommendation = useQuery({ queryKey: ['notification-recommendation'],
    queryFn: ({ signal }) => apiGet<Recommendation>('/api/search/recommendations', signal), staleTime: 300_000, retry: false });
  const restart = appSettingsStore().value.resumeRestartPercent;
  const playable = (recent.data?.items || []).map(item => ({ ...item,
    seconds: playbackPosition(item.key, { ...item }, restart, item.position ?? undefined) }))
    .filter(item => item.seconds > 0)
    .sort((a, b) => (b.position?.updated_at || 0) - (a.position?.updated_at || 0)).slice(0, 3);
  const notices = appSettingsStore().value.ingestNotices !== false ? (resultUpdates?.ingest_notices?.items || []) : [];
  const latestIngest = notices.at(-1);
  const ingestId = notices.length === 1 ? latestIngest?.asset_id : undefined;
  const ingested = useQuery({ queryKey: itemKey(ingestId ?? 0), enabled: !!ingestId,
    queryFn: ({ signal }) => fetchItem(ingestId!, signal), staleTime: 60_000, retry: false });
  const manual = (tasks.data?.runs || []).filter(task => task.trigger === 'manual' && task.parent_run_id == null
    && task.status !== 'cancelled').slice(0, 2);
  const latestFollow = followed.data?.groups?.[0]?.primary;
  const followContext: FollowContext = {
    sources: followed.data?.sources || [],
    aliases: followed.data?.author_aliases || [],
    credentials: new Set(),
  };
  const picked = recommendation.data?.jav?.items?.find(item => item.asset_id && !playable.some(row => row.kind === 'item' && row.id === item.asset_id));
  const startup = context.data?.startup;
  const settings = suggest && context.data?.lan_without_password;
  const cards = [...issueCards];
  if (settings) cards.push({
    id: 'lan-password', category: 'attention', status: 'information', icon: RiLightbulbFlashLine,
    title: t('shell:notifications.settingsSuggestion'), description: t('shell:notifications.lanPassword'),
    actions: [
      actionLink('/settings/network#network-access', t('shell:notifications.openNetwork')),
      { id: 'dismiss', label: t('shell:notifications.dismiss'), variant: 'ghost', run: dismissSuggestion },
    ],
  });
  for (const item of playable) {
    const duration = realDuration(item.duration);
    const percent = duration > 0 ? Math.min(100, 100 * item.seconds / duration) : undefined;
    const post = item.post;
    const identity = post ? notificationFollowIdentity(post, followContext) : undefined;
    const href = `/${item.kind === 'item' ? 'assets' : 'posts'}/${item.id}`;
    const link = linkFor(href);
    const title = post ? followTitle(post) : notificationAssetTitle(item);
    cards.push({
      id: item.key, category: 'watch', presentation: 'resume', title, titleLink: link,
      visual: <NotificationArtwork item={post ? undefined : item} thumbnail={post?.thumb_url} title={title} link={link} />,
      metadata: post && identity ? <NotificationFollowMetadata item={post} {...identity} linkFor={linkFor} />
        : <NotificationAssetMetadata item={item} linkFor={linkFor} />,
      detail: <NotificationPlaybackProgress time={timeAt(item.seconds)} percent={percent} />,
      actions: [{ id: 'resume', label: t('shell:notifications.resume'), run: () => {
        close();
        if (actions.resumePlayback) actions.resumePlayback(item.kind, item.id, item.seconds);
        else actions.navigate(`${href}?t=${item.seconds}`);
      } }],
    });
  }
  if (latestIngest) {
    const item = ingested.data;
    const asset = item ? { ...item, tags: item.tags?.map(tag => tag.k) } : undefined;
    const title = asset ? notificationAssetTitle(asset) : ingestId ? t('shell:notifications.ingested', { name: latestIngest.label })
      : t('shell:notifications.ingestedMany', { count: notices.length });
    const link = ingestId ? linkFor(`/assets/${ingestId}`) : undefined;
    cards.push({
      id: 'latest-ingest', category: 'updates', status: 'success', timestamp: timeOf(latestIngest.at),
      title, titleLink: link,
      visual: asset && link ? <NotificationArtwork item={asset} title={title} link={link} /> : undefined,
      metadata: asset ? <NotificationAssetMetadata item={asset} linkFor={linkFor} /> : undefined,
      description: asset ? t('shell:notifications.ingestedState') : undefined,
      actions: [ingestId ? actionLink(`/assets/${ingestId}`, t('shell:notifications.viewWork'))
        : actionLink('/tasks#cloudDownloads', t('shell:notifications.viewTasks'))],
    });
  }
  for (const item of manual) {
    const worked = item.status === 'succeeded';
    cards.push({
      id: `task:${item.id}`, category: 'updates', status: worked ? 'success' : item.status === 'failed' ? 'error' : 'information',
      title: taskName(item),
      description: statusLabel(item.status),
      visual: <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background-tertiary-default text-foreground-icon-secondary">
        <TaskIcon taskKey={item.task_key} className="size-5" />
      </span>,
      timestamp: item.finished_at ? momentText(item.finished_at) : undefined,
      actions: [actionLink(`/tasks#run-${item.id}`, t('shell:notifications.viewTask'))],
    });
  }
  if (latestFollow) {
    const identity = notificationFollowIdentity(latestFollow, followContext);
    const href = `/posts/${latestFollow.id}`;
    cards.push({
      id: `follow-update:${latestFollow.id}`, category: 'updates', status: 'information', icon: RiRssLine,
      title: followTitle(latestFollow), titleLink: linkFor(href),
      visual: identity.avatar ? <NotificationAuthorAvatar avatar={identity.avatar} author={identity.author}
        link={identity.entityName ? linkFor(entityPath('creator', identity.entityName)) : undefined} /> : undefined,
      metadata: <NotificationFollowMetadata item={latestFollow} {...identity} linkFor={linkFor} />,
      timestamp: latestFollow.published_at ? followCompactWhen(latestFollow) : undefined,
      actions: [actionLink(href, t('shell:notifications.viewPost'))],
    });
  }
  if (startup) {
    const when = startup.finished_at ?? startup.started_at;
    const stage = startup.issue_stage ? startupStageText[startup.issue_stage] : '';
    cards.push({
      id: 'startup-diagnostics', category: 'updates', status: startup.status === 'failed' ? 'error'
        : startup.status === 'completed' ? 'success' : 'information',
      icon: RiFileList3Line, title: t('manage:startupCapture.title'),
      description: [startupStatusText[startup.status], stage].filter(Boolean).join(' · '),
      timestamp: when ? timeOf(when / 1000) : undefined,
      actions: [actionLink('/settings/diagnostics#diagnostics-startup', t('shell:notifications.viewStartup'))],
    });
  }
  if (picked) {
    const asset: NotificationAsset = { ...picked, is_jav: true, catalog_title: picked.title,
      performers: picked.performer_refs?.map(ref => ref.name), performer_entities: picked.performer_refs };
    const [reason] = serverLabelList(picked.reasons, picked.reason_codes, picked.reason_params);
    const title = notificationAssetTitle(asset);
    const link = linkFor(`/assets/${picked.asset_id}`);
    cards.push({
      id: `recommendation:${picked.asset_id}`, category: 'watch', presentation: 'recommendation', title, titleLink: link,
      label: <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
        <Chip color="blue" variant="caption">{t('shell:notifications.recommendation')}</Chip>
        <p className="min-w-0 wrap-anywhere text-caption-1-regular text-text-secondary">
          {reason || t('shell:notifications.recommendationReason')}
        </p>
      </div>,
      visual: <NotificationArtwork item={asset} featured title={title} link={link} />,
      metadata: <NotificationAssetMetadata item={asset} linkFor={linkFor} />,
      actions: [actionLink(link.href, t('shell:notifications.viewWork'))],
    });
  }
  const reads = [recent, context, tasks, followed, recommendation];
  const failed = reads.filter(query => query.error);
  if (failed.length) cards.push({
    id: 'notification-results-error', category: 'updates', status: 'error',
    title: t('shell:notifications.partUnavailable'),
    retry: <Button size="small" variant="secondary" {...busyProps(failed.some(query => query.isFetching))}
      onClick={() => { for (const query of failed) void query.refetch() }}>{t('shell:shared.retryNow')}</Button>,
  });

  return <BoardNotificationCenter
    notifications={cards}
    tabs={[
      { id: 'all', label: t('shell:notifications.all') },
      { id: 'attention', label: t('shell:notifications.actionNeeded') },
      { id: 'updates', label: t('shell:notifications.updates') },
      { id: 'watch', label: t('shell:notifications.watch') },
    ]}
    title={t('shell:notifications.title')}
    categoryLabel={t('shell:notifications.categories')}
    unreadLabel={count => count > 0 ? t('shell:notifications.unreadCount', { count }) : t('shell:notifications.noUnread')}
    unreadItemLabel={t('shell:notifications.unreadItem')}
    markAllLabel={t('shell:notifications.readAll')}
    emptyMessage={t('shell:notifications.empty')}
    loadingLabel={t('shell:notifications.loading')}
    loading={loadingIssues || reads.some(query => query.isPending)}
    onMarkAllRead={onMarkAllRead}
  />;
}
