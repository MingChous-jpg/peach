import { useState } from 'react';
import { RiBuildingLine, RiFilmLine } from '@remixicon/react';
import { Chip } from '@/components/base/badges/chip';
import { cx } from '@/utils/cx';
import { cardIdentity, coverImage, coverUrl, detailPosterUrl, entityAvatar, logoUrl, relayoutCovers,
  type CoverItem, type IdentityItem } from '@peach/card-art';
import { entityPath } from '@peach/legacy/core';
import { appSettingsStore } from '../appearance/settings';
import { entityDisplayName } from '../core/entity-names';
import { useEntityNames } from './use-entity-names';
import { javDisplayName } from '../core/jav-title';
import { tagLabel } from '../core/tags';
import { t } from '../i18n';
import { authorAvatarHtml, followIdentity, sourceIcon } from './follow-feed/follow-marks';
import type { FollowContext, FollowItem } from './follow-feed/follow-feed';
import { ImageWithFallback } from './components/image-with-fallback';
import { ArtSlot } from './components/art-slot';
import type { NotificationLink } from './components/board-notification-center';
import { MediaAvatarStack } from './components/media-avatar-stack';
import { Progress } from './components/progress';

type LinkFor = (href: string) => NotificationLink;
type StudioReference = { id?: number | null; name?: string; has_logo?: boolean; logo_version?: string };

export type NotificationAsset = CoverItem & IdentityItem & {
  id: number;
  name?: string;
  title?: string;
  tags?: string[];
  follow_thumb_url?: string | null;
  follow_tags?: string[];
  entity_refs?: IdentityItem['entity_refs'] & { studio?: StudioReference[] };
  studio_ref?: StudioReference;
  has_studio_logo?: boolean;
  studio_logo_version?: string;
};

export const notificationAssetTitle = (item: NotificationAsset) =>
  javDisplayName(item, item.name || item.title) || item.title || t('catalog:catalogList.untitled');

export function NotificationArtwork({ item, thumbnail, featured, title, link }: {
  item?: NotificationAsset; thumbnail?: string; featured?: boolean; title: string; link: NotificationLink;
}) {
  const picture = item?.follow_thumb_url || (item ? detailPosterUrl(item, appSettingsStore().value.javImage) : thumbnail);
  const cover = item?.has_cover && (item.cover_key || item.code) ? coverUrl(item, 2) : '';
  const usesCover = !!(cover && picture?.startsWith('/cover?'));
  const [failedCover, setFailedCover] = useState('');
  const frontMarkup = item && usesCover && !featured && failedCover !== cover ? coverImage(item, 'big') : '';
  const preview = item && (item.has_thumb || item.has_local_poster) ? `/poster?id=${item.id}&c=4` : '';
  const chosen = usesCover ? (frontMarkup ? '' : featured ? cover : preview) : picture || cover;
  return <a {...link} data-notification-artwork="" aria-label={title}
    data-notification-cover-front={!featured && usesCover ? '' : undefined}
    className="relative isolate flex shrink-0 items-center justify-center self-start overflow-hidden rounded-lg bg-background-tertiary-default text-foreground-icon-secondary focus-visible:ring-2 focus-visible:ring-border-focus-ring">
    <RiFilmLine className="size-5" aria-hidden />
    {frontMarkup ? <span data-media-pic="" className="absolute! inset-0 aspect-auto!">
      <ArtSlot artwork={{ kind: 'cover', html: frontMarkup }}
        relayout={root => relayoutCovers(root, 'big')} onFailed={() => setFailedCover(cover)} />
    </span> : <ImageWithFallback src={chosen || ''} fallbacks={[cover, preview].filter(src => src && src !== chosen)}
      className="absolute inset-0 h-full w-full bg-background-secondary-default object-contain"
      alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />}
  </a>;
}

export function NotificationPlaybackProgress({ time, percent }: { time: string; percent?: number }) {
  const rounded = percent == null ? 0 : Math.round(percent);
  return <div data-notification-playback-progress="" className="flex min-w-0 items-center gap-2 text-caption-1-regular text-text-secondary">
    {percent != null ? <div className="min-w-6 flex-1">
      <Progress label={t('shell:notifications.playbackProgress')} value={percent} meter />
    </div> : null}
    <span className="shrink-0 tabular-nums">
      {time}{rounded > 0 ? ` · ${rounded}%` : ''}
    </span>
  </div>;
}

const metadataLinkClass = 'min-w-0 rounded-sm hover:text-text-primary hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus-ring';

function NotificationTags({ tags, linkFor }: { tags?: string[]; linkFor: LinkFor }) {
  const picked = [...new Set(tags || [])].filter(Boolean).slice(0, 3);
  return picked.length ? <div data-notification-tags="" className="flex min-w-0 flex-wrap gap-1 py-0.5">
    {picked.map(tag => <a key={tag} {...linkFor(entityPath('tag', tag))} className={cx('inline-flex max-w-full', metadataLinkClass)}>
      <Chip variant="caption" color="gray" className="min-w-0 max-w-full">
        <span className="truncate" title={tagLabel(tag)}>{tagLabel(tag)}</span>
      </Chip>
    </a>)}
  </div> : null;
}

export function NotificationAssetMetadata({ item, linkFor }: { item: NotificationAsset; linkFor: LinkFor }) {
  useEntityNames();
  const { kind, name, performers, refs, total } = cardIdentity(item);
  const ref = kind === 'performer' ? refs[0] : item.creator_entity ?? item.entity_refs?.creator?.[0];
  const label = kind ? entityDisplayName(kind, name, ref?.id) : '';
  const studioRef = item.entity_refs?.studio?.[0] ?? item.studio_ref;
  const studio = studioRef?.name || item.studio || '';
  const studioLabel = studio ? entityDisplayName('studio', studio, studioRef?.id) : '';
  const faces = kind === 'performer' ? performers.slice(0, 3) : kind ? [name] : [];
  return <>
    {label || studio ? <div data-notification-byline="" className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-caption-1-regular text-text-secondary">
      {label ? <div className="flex min-w-0 items-center gap-1.5">
        <MediaAvatarStack faces={faces.map((person, index) => {
          const face = kind === 'performer' ? refs[index] : ref;
          const personLabel = entityDisplayName(kind, person, face?.id);
          return <a key={face?.id || person} {...linkFor(entityPath(kind, person, face?.id))} data-media-avatar=""
            aria-label={personLabel} title={personLabel}
            className="focus-visible:ring-2 focus-visible:ring-border-focus-ring"
            dangerouslySetInnerHTML={{ __html: entityAvatar(person, face, kind) }} />;
        })} />
        <a {...linkFor(entityPath(kind, name, ref?.id))} className={cx('truncate', metadataLinkClass)} title={label}>
          {kind === 'performer' && total > 1 ? t('shell:notifications.castByline', { name: label, count: total }) : label}
        </a>
      </div> : null}
      {studio ? <a {...linkFor(entityPath('studio', studio, studioRef?.id))} data-notification-studio=""
        className={cx('inline-flex items-center gap-1', metadataLinkClass)} title={studioLabel}>
        <span className="relative flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-background-secondary-default">
          <RiBuildingLine className="size-3.5" aria-hidden />
          {studioRef?.has_logo || item.has_studio_logo ? <ImageWithFallback
            src={logoUrl(studio, 'icon', studioRef?.logo_version || item.studio_logo_version)} alt=""
            className="absolute inset-0 size-full bg-background-secondary-default object-contain" loading="lazy" decoding="async" /> : null}
        </span>
        <span className="truncate">{studioLabel}</span>
      </a> : null}
    </div> : null}
    <NotificationTags tags={item.follow_tags || item.tags} linkFor={linkFor} />
  </>;
}

export function notificationFollowIdentity(item: FollowItem, context: FollowContext) {
  const source = context.sources.find(source => source.id === item.source_id);
  const sources = source?.author_key ? context.sources.filter(row => row.author_key === source.author_key) : source ? [source] : [];
  return sources.length || item.credit ? followIdentity(item, sources, context) : {
    author: typeof item.author === 'string' ? item.author : '',
    avatar: typeof item.author === 'string' && item.author ? authorAvatarHtml([], item.author) : '',
    credited: '',
    entityName: '',
  };
}

export function NotificationAuthorAvatar({ avatar, author, link }: { avatar: string; author: string; link?: NotificationLink }) {
  const content = {
    'data-notification-author-avatar': '',
    className: 'relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-background-tertiary-default focus-visible:ring-2 focus-visible:ring-border-focus-ring [&_img]:object-cover',
    dangerouslySetInnerHTML: { __html: avatar },
  };
  return link ? <a {...content} {...link} aria-label={author} /> : <span {...content} />;
}

export function NotificationFollowMetadata({ item, author, credited, entityName, linkFor }: {
  item: FollowItem; author: string; credited: string; entityName: string; linkFor: LinkFor;
}) {
  const mark = sourceIcon(item.provider);
  return <>
    <div data-notification-byline="" className="flex min-w-0 items-center gap-1.5 text-caption-1-regular text-text-secondary">
      {entityName ? <a {...linkFor(entityPath('creator', entityName))} className={cx('truncate', metadataLinkClass)} title={author}>{author}</a>
        : author ? <span className="truncate" title={author}>{author}</span> : null}
      <span className="inline-flex shrink-0 items-center gap-1">
        {mark ? <span className="inline-flex size-3.5 [&_img]:size-full" dangerouslySetInnerHTML={{ __html: mark }} /> : null}
        {item.provider_label || item.provider}
      </span>
    </div>
    {credited ? <p className="truncate text-caption-1-regular text-text-secondary">{t('follow:followCard.credited', { names: credited })}</p> : null}
    <NotificationTags tags={item.tags} linkFor={linkFor} />
  </>;
}
