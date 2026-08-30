'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-6',
        'bg-surface-2/60 border-line/[0.06]',
        'backdrop-blur-xl',
        hover && 'hover:bg-surface-2/80 hover:border-line/[0.12] hover:-translate-y-1 transition-all duration-300',
        className,
      )}
    >
      {children}
    </div>
  );
}
