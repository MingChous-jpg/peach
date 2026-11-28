import { useState } from 'react';

const CONTROL = 'input:not([type="hidden"]), textarea, button[aria-haspopup="listbox"]';

export function useFieldValidation<Field extends string>() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  return {
    errors,
    clear() { setErrors({}); },
    update(field: Field, message?: string) {
      setErrors(current => current[field] === message ? current : { ...current, [field]: message });
    },
    check(form: HTMLFormElement | null, next: Partial<Record<Field, string>>) {
      setErrors(next);
      const invalid = Object.keys(next).filter(key => next[key as Field]);
      if (!invalid.length) return true;
      requestAnimationFrame(() => {
        const fields = [...(form?.querySelectorAll<HTMLElement>('[data-settings-field]') ?? [])]
          .filter(field => invalid.includes(field.dataset.settingsField ?? ''));
        const controls = fields.map(field => field.querySelector<HTMLElement>(CONTROL))
          .filter((control): control is HTMLElement => Boolean(control && !control.matches(':disabled')));
        controls[0]?.focus();
        const shells = controls.map(control => control.closest<HTMLElement>('[data-input-size]>div') ?? control)
          .filter(shell => getComputedStyle(shell).animationName === 'field-shake');
        // 重试时错误状态可能没变，重新挂上同一段 CSS 动效。
        for (const shell of shells) shell.style.animationName = 'none';
        if (shells.length) getComputedStyle(shells[0]).animationName;
        for (const shell of shells) shell.style.removeProperty('animation-name');
      });
      return false;
    },
  };
}

export const trimDownloadAddress = (raw: string) => raw.trim().replace(/\/+$/, '');

export function downloadAddressError(raw: string) {
  const address = trimDownloadAddress(raw);
  if (!address) return '';
  const candidate = address.includes('://') ? address : `http://${address}`;
  if (!/^https?:\/\/[^/?#@\\\s]+\/?$/i.test(candidate) || /[\x00-\x1f]/.test(candidate)) return 'errors.downloads.addressFormat';
  try {
    const url = new URL(candidate);
    if (!url.hostname) return 'errors.downloads.addressFormat';
    if (url.port === '0' || /:$/.test(address)) return 'errors.downloads.addressPortInvalid';
  } catch {
    return 'errors.downloads.addressPortInvalidIpv6';
  }
  return '';
}

export function normaliseCloudPrefix(raw: string) {
  return '/' + raw.trim().replaceAll('\\', '/').split('/').filter(Boolean).join('/');
}

export function invalidDownloadPath(raw: string) {
  if (!raw.trim()) return false;
  const path = normaliseCloudPrefix(raw);
  return path === '/' || path.split('/').some(part => part === '.' || part === '..');
}
