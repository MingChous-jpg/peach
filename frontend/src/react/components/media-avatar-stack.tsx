import type { CSSProperties, ReactElement } from 'react';

export function MediaAvatarStack({ faces }: { faces: ReactElement[] }) {
  if (faces.length <= 1) return faces[0] ?? null;
  const style = { '--media-avatar-count': faces.length } as CSSProperties;
  return <div data-media-avatars="" style={style}>{faces}</div>;
}
