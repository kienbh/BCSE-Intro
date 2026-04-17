'use client';

import { cn, getIcon } from '@/lib/utils';
import { useState } from 'react';

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fallback?: 'gradient' | 'initials' | 'icon';
  fallbackText?: string;
  iconName?: string;
  className?: string;
}

export default function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  fallback = 'gradient',
  fallbackText,
  iconName = 'Image',
  className,
}: ImagePlaceholderProps) {
  const [error, setError] = useState(false);
  const showFallback = error || !src || src === '#';

  if (!showFallback) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={() => setError(true)}
      />
    );
  }

  const initials = fallbackText
    ? fallbackText.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : alt.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const Icon = getIcon(iconName);

  if (fallback === 'initials') {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-sky-600 to-indigo-600 text-white font-bold',
          className,
        )}
        style={{ width, height }}
      >
        <span className="text-xl">{initials}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900',
        className,
      )}
      style={{ width, height }}
    >
      <Icon className="w-10 h-10 text-white/20" />
    </div>
  );
}
