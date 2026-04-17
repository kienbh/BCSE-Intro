'use client';

import { useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { getIcon } from '@/lib/utils';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  icon: string;
}

export default function StatCounter({ value, suffix = '', label, icon }: StatCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (v) => setDisplayed(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  const Icon = getIcon(icon);

  return (
    <div ref={ref} className="text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-4">
        <Icon className="w-7 h-7 text-sky-400" />
      </div>
      <div className="text-4xl md:text-5xl font-display font-bold text-sky-400 mb-1">
        {displayed}{suffix}
      </div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  );
}
