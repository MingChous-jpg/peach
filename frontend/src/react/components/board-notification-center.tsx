/* Adapted from the BoardUI Notification Center registry. The original is
 * locked in docs/reference-snapshots/upstream/boardui-notification-center.json.
 * SPDX-License-Identifier: MIT */
import type { ComponentType, MouseEvent, MouseEventHandler, ReactNode } from "react";
import { useState } from "react";
import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiInformationFill,
  RiNotification3Fill,
  RiNotificationOffLine,
} from "@remixicon/react";
import { Button, ButtonLink, type ButtonProps } from "@/components/base/buttons/button";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/base/segmented-control/segmented-control";
import { cx, sortCx } from "@/utils/cx";

export type NotificationCenterTab = "all" | "attention" | "updates" | "watch";
export type NotificationCenterStatus = "neutral" | "information" | "success" | "error";
export type NotificationLink = { href: string; onClick: MouseEventHandler<HTMLAnchorElement> };

type IconComponent = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}>;

export type NotificationCenterAction = {
  id: string;
  label: string;
  variant?: ButtonProps["variant"];
  href?: string;
  follow?(event: MouseEvent<HTMLAnchorElement>): void;
  run?(): void;
};

export type NotificationCenterItem = {
  id: string;
  category: Exclude<NotificationCenterTab, "all">;
  title: string;
  titleLink?: NotificationLink;
  presentation?: "resume" | "recommendation";
  label?: ReactNode;
  detail?: ReactNode;
  description?: string;
  timestamp?: string;
  unread?: boolean;
  status?: NotificationCenterStatus;
  icon?: IconComponent;
  visual?: ReactNode;
  metadata?: ReactNode;
  actions?: NotificationCenterAction[];
  retry?: ReactNode;
};

interface NotificationCenterProps {
  notifications: NotificationCenterItem[];
  tabs: readonly { id: NotificationCenterTab; label: string }[];
  title: string;
  categoryLabel: string;
  unreadLabel(count: number): string;
  unreadItemLabel: string;
  markAllLabel: string;
  emptyMessage: string;
  loadingLabel: string;
  loading: boolean;
  onMarkAllRead(): void;
}

const STATUS_ICON: Record<NotificationCenterStatus, IconComponent> = {
  neutral: RiNotification3Fill,
  information: RiInformationFill,
  success: RiCheckboxCircleFill,
  error: RiErrorWarningFill,
};

const styles = sortCx({
  status: {
    neutral: "bg-background-tertiary-default text-text-secondary",
    information:
      "bg-notification-information-background text-notification-information-foreground",
    success: "bg-notification-success-background text-notification-success-foreground",
    error: "bg-notification-error-background text-notification-error-foreground",
  },
});

function NotificationVisual({ item }: { item: NotificationCenterItem }) {
  if (item.visual) return item.visual;

  const status = item.status ?? "neutral";
  const Icon = item.icon ?? STATUS_ICON[status];

  return (
    <span
      className={cx(
        "flex size-10 shrink-0 items-center justify-center rounded-full",
        styles.status[status],
      )}
    >
      <Icon className="size-5" aria-hidden />
    </span>
  );
}

function TabLabel({
  label,
  count,
}: {
  label: string;
  count: number;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {label}
      <span className="inline-flex min-w-5 items-center justify-center rounded-sm bg-badge-neutral-background px-1 py-px text-caption-1-medium text-text-secondary">
        {count}
      </span>
    </span>
  );
}

function openCard(event: MouseEvent<HTMLElement>) {
  if (event.defaultPrevented || event.button || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.target instanceof Element && event.target.closest("a,button,input,select,textarea,[contenteditable]")) return;
  const selection = window.getSelection();
  if (selection && !selection.isCollapsed && selection.containsNode(event.currentTarget, true)) return;
  event.currentTarget.querySelector<HTMLAnchorElement>("[data-notification-title]")?.click();
}

export function BoardNotificationCenter({
  notifications,
  tabs,
  title,
  categoryLabel,
  unreadLabel,
  unreadItemLabel,
  markAllLabel,
  emptyMessage,
  loadingLabel,
  loading,
  onMarkAllRead,
}: NotificationCenterProps) {
  const [activeTab, setTab] = useState<NotificationCenterTab>("all");
  const unreadCount = notifications.filter((item) => item.unread).length;
  const tabCounts = {
    all: notifications.length,
    attention: notifications.filter((item) => item.category === "attention").length,
    updates: notifications.filter((item) => item.category === "updates").length,
    watch: notifications.filter((item) => item.category === "watch").length,
  };
  const visibleNotifications = activeTab === "all"
    ? notifications
    : notifications.filter((item) => item.category === activeTab);

  return (
    <section className="flex min-h-0 w-full flex-col overflow-hidden">
      <div className="flex shrink-0 flex-col gap-3 p-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            <h2 className="text-title-3-medium text-text-primary">{title}</h2>
            <p className="text-body-regular text-text-secondary">{unreadLabel(unreadCount)}</p>
          </div>
          <Button variant="ghost" size="small" className="shrink-0" onClick={onMarkAllRead} disabled={unreadCount === 0}>
            {markAllLabel}
          </Button>
        </div>

        <SegmentedControl
          data-notification-categories=""
          aria-label={categoryLabel}
          selectedKeys={[activeTab]}
          onSelectionChange={(keys) => {
            const next = [...(keys as Set<string>)][0] as NotificationCenterTab | undefined;
            if (next) setTab(next);
          }}
          className="flex w-full"
        >
          {tabs.map(({ id, label }) => (
            <SegmentedControlItem key={id} id={id} className="min-w-0 flex-1" data-copy-interact="">
              <TabLabel label={label} count={tabCounts[id]} />
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
      </div>

      <div data-notification-cards="" className="min-h-0 overflow-y-auto overscroll-contain px-3 pb-3 pt-1">
        {visibleNotifications.length === 0 ? (
          <div role={loading ? "status" : undefined} className="flex min-h-36 flex-col items-center justify-center gap-2 rounded-2xl bg-background-primary-default px-5 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-background-secondary-default text-foreground-icon-secondary">
              <RiNotificationOffLine className="size-5" aria-hidden />
            </span>
            <p className="text-body-medium text-text-primary">{loading ? loadingLabel : emptyMessage}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {visibleNotifications.map((item) => {
              const openAction = item.actions?.find((action) => action.href);
              const titleLink = item.titleLink ?? (openAction?.href ? { href: openAction.href, onClick: openAction.follow } : undefined);
              return (
                <article
                  key={item.id}
                  data-notification-card=""
                  data-notification-category={item.category}
                  data-notification-presentation={item.presentation}
                  data-notification-openable={titleLink ? "" : undefined}
                  onClick={titleLink ? openCard : undefined}
                  className={cx(
                    "group/item relative flex gap-3 rounded-notification-card border border-separator-border bg-background-primary-default p-3 shadow-2xs",
                    item.presentation === "recommendation" && "flex-col",
                    titleLink && "cursor-pointer transition-colors hover:bg-background-primary-hover has-[:focus-visible]:bg-background-primary-hover motion-reduce:transition-none",
                  )}
                >
                  <NotificationVisual item={item} />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    {item.label}
                    <div className="flex min-w-0 items-start justify-between gap-2">
                      {titleLink ? <a {...titleLink} data-notification-title=""
                        className="line-clamp-2 min-w-0 wrap-anywhere rounded-sm text-body-medium text-text-primary hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus-ring"
                        title={item.title}>{item.title}</a> : <p className="line-clamp-2 min-w-0 wrap-anywhere text-body-medium text-text-primary" title={item.title}>{item.title}</p>}
                      {item.timestamp || item.unread ? <div className="flex shrink-0 items-center gap-2">
                        {item.timestamp ? <span className="text-caption-1-medium whitespace-nowrap text-text-secondary">
                          {item.timestamp}
                        </span> : null}
                        {item.unread ? <span className="mt-1 size-2 rounded-full bg-accent-500" aria-label={unreadItemLabel} /> : null}
                      </div> : null}
                    </div>
                    {item.detail}
                    {item.metadata}
                    {item.description ? <p className="wrap-anywhere text-body-regular text-text-secondary">{item.description}</p> : null}
                    {item.actions?.length || item.retry ? (
                      <div className="mt-1.5 flex flex-wrap items-start gap-2">
                        {item.actions?.map((action) => action.href ? (
                          <ButtonLink key={action.id} href={action.href} onClick={action.follow} size="small" variant={action.variant ?? "secondary"}>
                            {action.label}
                          </ButtonLink>
                        ) : (
                          <Button key={action.id} size="small" variant={action.variant ?? "secondary"} onClick={action.run}>
                            {action.label}
                          </Button>
                        ))}
                        {item.retry ? <div data-notification-retry="" className="ml-auto min-w-0 text-right">{item.retry}</div> : null}
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
