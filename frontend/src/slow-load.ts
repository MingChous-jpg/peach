type Phase = 'page-load' | 'page-data' | 'playback-plan' | 'playback-start' | 'playback-buffer';
type Timing = { ttfb_ms?: number; headers_ms?: number; asset_id?: number; ready_state?: number };

const SLOW_MS = 1000;
let windowStarted = 0;
let entries = 0;

/** 只保留本机诊断所需的阶段与数字，不发送页面地址、片源或会话号。 */
export function reportSlowLoad(phase: Phase, elapsed: number, timing: Timing = {}, pending = false): void {
  if (!Number.isFinite(elapsed) || elapsed < SLOW_MS || document.visibilityState === 'hidden') return;
  const now = Date.now();
  if (now - windowStarted >= 60_000) {
    windowStarted = now;
    entries = 0;
  }
  if (entries >= 8) return;
  entries++;
  void fetch('/api/diagnostics/client-error', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', keepalive: true,
    body: JSON.stringify({ kind: 'performance', message: phase, timing: {
      ...timing, elapsed_ms: Math.round(elapsed), pending,
    } }),
  }).catch(() => {});
}

export function requestTiming(entry?: PerformanceResourceTiming): Timing {
  return entry && entry.responseStart > 0 ? {
    headers_ms: Math.round(entry.responseStart - entry.startTime),
    ...(entry.requestStart > 0 ? { ttfb_ms: Math.round(entry.responseStart - entry.requestStart) } : {}),
  } : {};
}

export function observePlaybackWait(video: HTMLVideoElement, source: () => string, signal: AbortSignal) {
  let started = 0;
  let watching = false;
  let hasPlayed = false;
  let timer = 0;
  let position = 0;
  const report = (pending: boolean) => {
    const src = source();
    if (!src || document.visibilityState === 'hidden') return;
    const url = new URL(src, location.href);
    if (url.origin !== location.origin) return;
    const id = url.pathname === '/stream' ? url.searchParams.get('id')
      : /^\/stream\/hls\/(\d+)\/index\.m3u8$/.exec(url.pathname)?.[1];
    if (!id || !/^\d+$/.test(id)) return;
    const request = performance.getEntriesByName(url.href, 'resource').at(-1) as PerformanceResourceTiming | undefined;
    reportSlowLoad(hasPlayed ? 'playback-buffer' : 'playback-start', performance.now() - started, {
      ...requestTiming(request), asset_id: Number(id), ready_state: video.readyState,
    }, pending);
  };
  const stop = () => {
    clearTimeout(timer);
    watching = false;
  };
  const start = () => {
    if (watching || video.paused || video.seeking || document.visibilityState === 'hidden') return;
    started = performance.now();
    position = video.currentTime;
    watching = true;
    timer = window.setTimeout(() => report(true), 5000);
  };
  const resumed = () => {
    if (watching) report(false);
    stop();
    hasPlayed = true;
  };
  for (const name of ['play', 'waiting', 'stalled']) {
    video.addEventListener(name, () => { if (name === 'play' || video.readyState < 3) start() }, { signal });
  }
  for (const name of ['pause', 'seeking', 'ended', 'emptied', 'error']) {
    video.addEventListener(name, stop, { signal });
  }
  video.addEventListener('playing', resumed, { signal });
  video.addEventListener('timeupdate', () => {
    if (watching && !video.seeking && video.currentTime > position) resumed();
  }, { signal });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') stop();
  }, { signal });
  signal.addEventListener('abort', stop, { once: true });
  return () => { stop(); hasPlayed = false };
}
