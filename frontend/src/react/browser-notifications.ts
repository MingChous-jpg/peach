import { t } from '../i18n';

const SEEN = 'peach.browser-notifications.seen.v1';

export const browserNoticePermission = () =>
  window.isSecureContext && typeof window.Notification === 'function' ? Notification.permission : 'unavailable';

export interface BrowserNotice {
  id: string;
  kind: 'download' | 'completed' | 'failed';
  href: string;
}

export function deliverBrowserNotices(events: BrowserNotice[], navigate: (href: string) => void): void {
  if (!events.length) return;
  const deliver = () => {
    if (document.visibilityState !== 'hidden' || browserNoticePermission() !== 'granted') return;
    let seen: string[] = [];
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(SEEN) || '[]');
      if (Array.isArray(saved)) seen = saved.filter((key): key is string => typeof key === 'string');
    } catch { /* 普通浏览器仍按通知 tag 合并。 */ }
    const fresh = events.filter(event => !seen.includes(event.id));
    if (!fresh.length) return;
    const first = fresh[0];
    const body = fresh.length === 1 ? t(`shell:browserNotice.${first.kind}`)
      : t(fresh.some(event => event.kind === 'failed') ? 'shell:browserNotice.multipleFailed' : 'shell:browserNotice.multiple',
        { count: fresh.length });
    try {
      const notice = new Notification(t('shell:browserNotice.title'), { body, tag: first.id });
      notice.onclick = () => {
        notice.close();
        window.focus();
        navigate(fresh.length === 1 ? first.href : '/tasks');
      };
      localStorage.setItem(SEEN, JSON.stringify([...seen, ...fresh.map(event => event.id)].slice(-120)));
    } catch { /* 浏览器拒绝时，结果仍可从网页查看。 */ }
  };
  if (navigator.locks) void navigator.locks.request(SEEN, deliver).catch(() => {});
  else deliver();
}
