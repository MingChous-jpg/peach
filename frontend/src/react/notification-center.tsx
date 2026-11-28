import { useEffect, useId, useRef, useState, useSyncExternalStore, type MouseEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RiLightbulbFlashLine, RiPulseLine, RiRssLine } from '@remixicon/react';
import { useInteractOutside } from 'react-aria';
import { Popover } from 'react-aria-components';
import { Button } from '@/components/base/buttons/button';
import { Chip } from '@/components/base/badges/chip';
import { apiGet, apiSend, errorMessage } from '../api';
import { appSettingsStore, NOTIFICATION_LIMIT_MAX, type AppSettings } from '../appearance/settings';
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
const HIDDEN_KEY = 'peach.notification-center.hidden.v1';
const readKeys = (key: string) => {
  try { return new Set<string>(JSON.parse(localStorage.getItem(key) || '[]')); }
  catch { return new Set<string>(); }
};

const timeAt = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
const issueId = (issue: BackgroundIssue) => `${issue.key}:${issue.since || issue.noticed_at}`;

export function NotificationCenter({ actions, trigger }: { actions: ShellActions; trigger: HTMLButtonElement }) {
  const triggerRef = useRef(trigger);
  const popoverRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(() => readKeys(READ_KEY));
  const currentSeen = useRef(seen);
  const [hidden] = useState(() => readKeys(HIDDEN_KEY));
  const preferences = appSettingsStore();
  useSyncExternalStore(preferences.subscribe, preferences.version);
  const title = t('shell:notifications.title');
  const issues = useQuery({ queryKey: BACKGROUND_ISSUES_KEY,
    queryFn: ({ signal }) => fetchBackgroundIssues(signal),
    refetchInterval: backgroundIssuesInterval });
  const rows = issues.data?.issues || [];

  useEffect(() => {
    const toggle = () => setOpen(value => !value);
    trigger.addEventListener('click', toggle);
    trigger.disabled = false;
    return () => {
      trigger.removeEventListener('click', toggle);
      trigger.disabled = true;
    };
  }, [trigger]);
  const canCloseOnOutside = (element: Element) => !trigger.contains(element) && !element.closest('[data-copy-editor], #toasts');
  useInteractOutside({ ref: popoverRef, isDisabled: !open, onInteractOutside: (event) => {
    if (event.target instanceof Element && canCloseOnOutside(event.target)) setOpen(false);
  } });
  const go = (path: string) => { setOpen(false); actions.navigate(path) };
  const updateSeen = (next: Set<string>) => {
    currentSeen.current = next;
    setSeen(next);
    try { localStorage.setItem(READ_KEY, JSON.stringify([...next])) } catch { /* The current view retains the changes. */ }
  };
  const remember = (keys: string[]) => updateSeen(new Set([...currentSeen.current, ...keys].slice(-120)));
  const dismiss = (items: NotificationCenterItem[]) => {
    const changed = items.filter(item => !currentSeen.current.has(item.id));
    if (!changed.length) return;
    const ids = new Set(changed.map(item => item.id));
    remember([...ids]);
    const read = changed.filter(item => item.unread).length;
    const hidden = changed.length - read;
    const message = read && hidden ? t('shell:notifications.readAndHidden', { read, hidden })
      : read ? t('shell:notifications.markedRead', { count: read })
      : t('shell:notifications.cardsHidden', { count: hidden });
    actions.receipt(message, {
      undo: async () => {
        updateSeen(new Set([...currentSeen.current].filter(id => !ids.has(id))));
        popoverRef.current?.querySelector<HTMLButtonElement>('[data-notification-categories] button[data-selected]')?.focus();
      },
    });
  };
  const linkFor = (href: string, readId?: string): NotificationLink => ({
    href, onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.button || event.altKey || event.shiftKey || event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      if (readId && !currentSeen.current.has(readId)) remember([readId]);
      go(href);
    },
  });
  const actionLink = (href: string, label = t('shell:shared.open'), readId?: string): NotificationCenterAction => ({
    id: 'open', label, href, follow: linkFor(href, readId).onClick,
  });
  const issueCards: NotificationCenterItem[] = rows.map(issue => ({
    id: issueId(issue), category: 'attention', status: 'error', title: codedText(issue, 'title'),
    timestamp: momentText(issue.since ?? issue.noticed_at), unread: true,
    actions: [actionLink(issue.href, codedText(issue, 'link_label'), issueId(issue))],
    retry: issue.retry && issue.retry_available ? <RetryIssue url={issue.retry} /> : undefined,
  }));
  if (issues.error) issueCards.push({
    id: 'issue-feed-error', category: 'attention', status: 'error',
    title: t('shell:notifications.issuesUnavailable'), description: errorMessage(issues.error),
    retry: <Button size="small" variant="secondary" {...busyProps(issues.isFetching)}
      onClick={() => void issues.refetch()}>{t('shell:shared.retryNow')}</Button>,
  });
  const { cards, loading } = useNotificationCards({ open, actions, issueCards, loadingIssues: issues.isPending,
    actionLink, linkFor, close: () => setOpen(false), preferences: preferences.value });
  const visibleCards = cards.filter(card => !seen.has(card.id) && !hidden.has(card.id));
  const clearable = visibleCards.filter(card => card.unread || card.hideable);
  const unreadCount = visibleCards.filter(card => card.unread).length;
  const triggerLabel = unreadCount ? t('shell:notifications.unread', { count: unreadCount }) : title;
  useEffect(() => {
    trigger.title = title;
    trigger.setAttribute('aria-label', triggerLabel);
    trigger.setAttribute('aria-expanded', String(open));
    if (open) trigger.setAttribute('aria-controls', panelId);
    else trigger.removeAttribute('aria-controls');
  }, [open, panelId, title, trigger, triggerLabel]);

  return <>
    {unreadCount > 0 ? <span data-notification-dot="" aria-hidden="true" /> : null}
    <Popover ref={popoverRef} triggerRef={triggerRef} isOpen={open} isNonModal onOpenChange={setOpen} placement="bottom end" offset={8}
      shouldCloseOnInteractOutside={canCloseOnOutside}
      data-notification-menu="" className="peach-react overflow-hidden outline-none">
      <MenuDialog id={panelId} aria-label={title} data-copy-choice-host="" data-notification-dialog="" className="flex min-h-0 flex-col overflow-hidden outline-none">
        {open ? <BoardNotificationCenter
          notifications={visibleCards}
          tabs={[
            { id: 'all', label: t('shell:notifications.all') },
            { id: 'attention', label: t('shell:notifications.actionNeeded') },
            { id: 'updates', label: t('shell:notifications.updates') },
            { id: 'watch', label: t('shell:notifications.watch') },
          ]}
          title={title}
          categoryLabel={t('shell:notifications.categories')}
          summaryLabel={(total, unread) => t('shell:notifications.summary', {
            total: t('shell:notifications.totalCount', { count: total }),
            unread: t('shell:notifications.unreadCount', { count: unread }),
          })}
          markItemLabel={t('shell:notifications.markItem')}
          hideItemLabel={t('shell:notifications.hideItem')}
          markAllLabel={t('shell:notifications.readAll')}
          settingsLink={linkFor('/settings/appearance#notification-settings')}
          settingsLabel={t('settings:notificationCenter.title')}
          emptyMessage={t('shell:notifications.empty')}
          loadingLabel={t('shell:notifications.loading')}
          loading={loading}
          canMarkAllRead={clearable.length > 0}
          onMarkAllRead={() => dismiss(clearable)}
          onDismiss={item => dismiss([item])}
        /> : null}
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

function useNotificationCards({ open, actions, issueCards, loadingIssues, close, actionLink, linkFor, preferences }: {
  open: boolean; actions: ShellActions; issueCards: NotificationCenterItem[]; loadingIssues: boolean;
  close(): void;
  actionLink(href: string, label?: string, readId?: string): NotificationCenterAction;
  linkFor(href: string, readId?: string): NotificationLink;
  preferences: AppSettings;
}) {
  const { notificationLimits: limits, resumeRestartPercent: restart, ingestNotices } = preferences;
  const resultUpdates = useQuery({ queryKey: RESULT_UPDATES_KEY, queryFn: ({ signal }) => fetchResultUpdates(signal), enabled: false }).data;
  const recent = useQuery({ queryKey: ['notification-recent-playback'],
    queryFn: ({ signal }) => apiGet<{ items: ResumeItem[] }>('/api/player/recent', signal), enabled: open && limits.resume > 0, retry: false });
  const context = useQuery({ queryKey: ['notification-context'],
    queryFn: ({ signal }) => apiGet<Context>('/api/notification-context', signal), enabled: open, retry: false });
  const tasks = useQuery({ queryKey: ['notification-recent-tasks'],
    queryFn: ({ signal }) => apiGet<{ runs?: TaskRunPayload[] }>('/api/tasks?status=finished&limit=16', signal), enabled: open && limits.task > 0, retry: false });
  const followed = useQuery({ queryKey: ['notification-follow'],
    queryFn: ({ signal }) => apiGet<Feed>(`/api/follow?sort=new&limit=${NOTIFICATION_LIMIT_MAX}`, signal),
    enabled: open && limits.follow > 0, retry: false });
  const recommendation = useQuery({ queryKey: ['notification-recommendation'],
    queryFn: ({ signal }) => apiGet<Recommendation>('/api/search/recommendations', signal),
    enabled: open && limits.recommendation > 0, staleTime: 300_000, retry: false });
  const playable = (recent.data?.items || []).map(item => ({ ...item,
    seconds: playbackPosition(item.key, { ...item }, restart, item.position ?? undefined) }))
    .filter(item => item.seconds > 0)
    .sort((a, b) => (b.position?.updated_at || 0) - (a.position?.updated_at || 0)).slice(0, limits.resume);
  const notices = ingestNotices ? (resultUpdates?.ingest_notices?.items || []) : [];
  const latestIngest = notices.at(-1);
  const ingestId = notices.length === 1 ? latestIngest?.asset_id : undefined;
  const ingested = useQuery({ queryKey: itemKey(ingestId ?? 0), enabled: open && !!ingestId,
    queryFn: ({ signal }) => fetchItem(ingestId!, signal), staleTime: 60_000, retry: false });
  const manual = (tasks.data?.runs || []).filter(task => task.trigger === 'manual' && task.parent_run_id == null
    && task.status !== 'cancelled').slice(0, limits.task);
  const followUpdates = followed.data?.groups?.slice(0, limits.follow) || [];
  const followContext: FollowContext = {
    sources: followed.data?.sources || [],
    aliases: followed.data?.author_aliases || [],
    credentials: new Set(),
  };
  const recommendations = (recommendation.data?.jav?.items || [])
    .filter(item => item.asset_id && !playable.some(row => row.kind === 'item' && row.id === item.asset_id))
    // Keep the same cards when the server reshuffles its cached recommendation pool.
    .sort((a, b) => (a.asset_id ?? 0) - (b.asset_id ?? 0))
    .slice(0, limits.recommendation);
  const startup = context.data?.startup;
  const cards = [...issueCards];
  if (context.data?.lan_without_password) cards.push({
    id: 'lan-password', category: 'attention', status: 'information', icon: RiLightbulbFlashLine, unread: true,
    title: t('shell:notifications.settingsSuggestion'), description: t('shell:notifications.lanPassword'),
    actions: [actionLink('/settings/network#network-access', t('shell:notifications.openNetwork'), 'lan-password')],
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
      id: `resume:${item.key}:${item.seconds}`, category: 'watch', presentation: 'resume', title, titleLink: link, hideable: true,
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
    const id = `ingest:${latestIngest.asset_id}:${latestIngest.at}`;
    const item = ingested.data;
    const asset = item ? { ...item, tags: item.tags?.map(tag => tag.k) } : undefined;
    const title = asset ? notificationAssetTitle(asset) : ingestId ? t('shell:notifications.ingested', { name: latestIngest.label })
      : t('shell:notifications.ingestedMany', { count: notices.length });
    const link = ingestId ? linkFor(`/assets/${ingestId}`, id) : undefined;
    cards.push({
      id, category: 'updates', status: 'success', timestamp: timeOf(latestIngest.at), unread: true,
      title, titleLink: link,
      visual: asset && link ? <NotificationArtwork item={asset} title={title} link={link} /> : undefined,
      metadata: asset ? <NotificationAssetMetadata item={asset} linkFor={linkFor} /> : undefined,
      description: asset ? t('shell:notifications.ingestedState') : undefined,
      actions: [ingestId ? actionLink(`/assets/${ingestId}`, t('shell:notifications.viewWork'), id)
        : actionLink('/tasks#cloudDownloads', t('shell:notifications.viewTasks'), id)],
    });
  }
  for (const item of manual) {
    const id = `task:${item.id}`;
    const worked = item.status === 'succeeded';
    cards.push({
      id, category: 'updates', unread: true, status: worked ? 'success' : item.status === 'failed' ? 'error' : 'information',
      title: taskName(item),
      description: statusLabel(item.status),
      visual: <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background-tertiary-default text-foreground-icon-secondary">
        <TaskIcon taskKey={item.task_key} className="size-5" />
      </span>,
      timestamp: item.finished_at ? momentText(item.finished_at) : undefined,
      actions: [actionLink(`/tasks#run-${item.id}`, t('shell:notifications.viewTask'), id)],
    });
  }
  for (const { primary: latestFollow } of followUpdates) {
    const id = `follow-update:${latestFollow.id}`;
    const identity = notificationFollowIdentity(latestFollow, followContext);
    const href = `/posts/${latestFollow.id}`;
    cards.push({
      id, category: 'updates', status: 'information', icon: RiRssLine, unread: true,
      title: followTitle(latestFollow), titleLink: linkFor(href, id),
      visual: identity.avatar ? <NotificationAuthorAvatar avatar={identity.avatar} author={identity.author}
        link={identity.entityName ? linkFor(entityPath('creator', identity.entityName)) : undefined} /> : undefined,
      metadata: <NotificationFollowMetadata item={latestFollow} {...identity} linkFor={linkFor} />,
      timestamp: latestFollow.published_at ? followCompactWhen(latestFollow) : undefined,
      actions: [actionLink(href, t('shell:notifications.viewPost'), id)],
    });
  }
  if (startup) {
    const when = startup.finished_at ?? startup.started_at;
    const id = `startup-diagnostics:${when ?? startup.status}`;
    const stage = startup.issue_stage ? startupStageText[startup.issue_stage] : '';
    cards.push({
      id, category: 'updates', unread: true, status: startup.status === 'failed' ? 'error'
        : startup.status === 'completed' ? 'success' : 'information',
      icon: RiPulseLine, title: t('manage:startupCapture.title'),
      description: [startupStatusText[startup.status], stage].filter(Boolean).join(' · '),
      timestamp: when ? timeOf(when / 1000) : undefined,
      actions: [actionLink('/settings/diagnostics#diagnostics-startup', t('shell:notifications.viewStartup'), id)],
    });
  }
  for (const picked of recommendations) {
    const asset: NotificationAsset = { ...picked, is_jav: true, catalog_title: picked.title,
      performers: picked.performer_refs?.map(ref => ref.name), performer_entities: picked.performer_refs };
    const [reason] = serverLabelList(picked.reasons, picked.reason_codes, picked.reason_params);
    const title = notificationAssetTitle(asset);
    const link = linkFor(`/assets/${picked.asset_id}`);
    cards.push({
      id: `recommendation:${picked.asset_id}`, category: 'watch', presentation: 'recommendation', title, titleLink: link, hideable: true,
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
  const reads = [context, ...(limits.resume ? [recent] : []), ...(limits.task ? [tasks] : []),
    ...(limits.follow ? [followed] : []), ...(limits.recommendation ? [recommendation] : [])];
  const failed = reads.filter(query => query.error);
  if (failed.length) cards.push({
    id: 'notification-results-error', category: 'updates', status: 'error',
    title: t('shell:notifications.partUnavailable'),
    retry: <Button size="small" variant="secondary" {...busyProps(failed.some(query => query.isFetching))}
      onClick={() => { for (const query of failed) void query.refetch() }}>{t('shell:shared.retryNow')}</Button>,
  });

  return { cards, loading: loadingIssues || reads.some(query => query.isPending) };
}
