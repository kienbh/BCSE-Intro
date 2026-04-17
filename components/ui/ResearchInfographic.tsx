'use client';

import { cn, getIcon } from '@/lib/utils';

type Color = 'rose' | 'purple' | 'sky' | 'emerald' | 'amber' | 'indigo';
type Pattern = 'grid' | 'dots' | 'waves' | 'circuit' | 'scan' | 'nodes';

interface Props {
  icon: string;
  color: Color;
  pattern: Pattern;
  topicCount?: number;
  className?: string;
}

const colorMap: Record<Color, { from: string; to: string; icon: string; stroke: string }> = {
  rose:    { from: 'from-rose-500/25',    to: 'to-rose-900/10',    icon: 'text-rose-300',    stroke: 'rgba(251, 113, 133, 0.5)' },
  purple:  { from: 'from-purple-500/25',  to: 'to-purple-900/10',  icon: 'text-purple-300',  stroke: 'rgba(192, 132, 252, 0.5)' },
  sky:     { from: 'from-sky-500/25',     to: 'to-sky-900/10',     icon: 'text-sky-300',     stroke: 'rgba(56, 189, 248, 0.5)'  },
  emerald: { from: 'from-emerald-500/25', to: 'to-emerald-900/10', icon: 'text-emerald-300', stroke: 'rgba(52, 211, 153, 0.5)'  },
  amber:   { from: 'from-amber-500/25',   to: 'to-amber-900/10',   icon: 'text-amber-300',   stroke: 'rgba(251, 191, 36, 0.5)'  },
  indigo:  { from: 'from-indigo-500/25',  to: 'to-indigo-900/10',  icon: 'text-indigo-300',  stroke: 'rgba(129, 140, 248, 0.5)' },
};

function PatternSvg({ pattern, stroke }: { pattern: Pattern; stroke: string }) {
  const common = { className: 'absolute inset-0 w-full h-full', preserveAspectRatio: 'none', viewBox: '0 0 200 100' };

  if (pattern === 'grid') {
    return (
      <svg {...common}>
        <defs>
          <pattern id={`g-${stroke}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke={stroke} strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="200" height="100" fill={`url(#g-${stroke})`} />
      </svg>
    );
  }
  if (pattern === 'dots') {
    return (
      <svg {...common}>
        <defs>
          <pattern id={`d-${stroke}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={stroke} />
          </pattern>
        </defs>
        <rect width="200" height="100" fill={`url(#d-${stroke})`} />
      </svg>
    );
  }
  if (pattern === 'waves') {
    return (
      <svg {...common}>
        <path d="M0 50 Q 25 20, 50 50 T 100 50 T 150 50 T 200 50" fill="none" stroke={stroke} strokeWidth="1" opacity="0.8" />
        <path d="M0 65 Q 25 35, 50 65 T 100 65 T 150 65 T 200 65" fill="none" stroke={stroke} strokeWidth="0.8" opacity="0.5" />
        <path d="M0 35 Q 25 5, 50 35 T 100 35 T 150 35 T 200 35" fill="none" stroke={stroke} strokeWidth="0.8" opacity="0.5" />
        <path d="M0 80 Q 25 60, 50 80 T 100 80 T 150 80 T 200 80" fill="none" stroke={stroke} strokeWidth="0.6" opacity="0.3" />
      </svg>
    );
  }
  if (pattern === 'circuit') {
    return (
      <svg {...common}>
        <g fill="none" stroke={stroke} strokeWidth="0.8" opacity="0.7">
          <path d="M10 20 L40 20 L40 50 L70 50 L70 80 L120 80" />
          <path d="M160 15 L160 45 L130 45 L130 75" />
          <path d="M20 90 L60 90 L60 65 L95 65" />
          <path d="M180 90 L145 90 L145 60 L175 60 L175 30" />
        </g>
        <g fill={stroke}>
          <circle cx="40" cy="20" r="1.5" /><circle cx="70" cy="50" r="1.5" />
          <circle cx="130" cy="45" r="1.5" /><circle cx="160" cy="15" r="1.5" />
          <circle cx="60" cy="90" r="1.5" /><circle cx="145" cy="60" r="1.5" />
        </g>
      </svg>
    );
  }
  if (pattern === 'scan') {
    return (
      <svg {...common}>
        <g fill="none" stroke={stroke} strokeWidth="0.8" opacity="0.6">
          <rect x="20" y="15" width="40" height="30" strokeDasharray="4 3" />
          <rect x="80" y="55" width="35" height="25" strokeDasharray="4 3" />
          <rect x="140" y="20" width="45" height="35" strokeDasharray="4 3" />
        </g>
        <g fill={stroke} opacity="0.8">
          <circle cx="20" cy="15" r="1.5" /><circle cx="60" cy="15" r="1.5" />
          <circle cx="20" cy="45" r="1.5" /><circle cx="60" cy="45" r="1.5" />
          <circle cx="140" cy="20" r="1.5" /><circle cx="185" cy="20" r="1.5" />
          <circle cx="140" cy="55" r="1.5" /><circle cx="185" cy="55" r="1.5" />
        </g>
        <line x1="0" y1="70" x2="200" y2="70" stroke={stroke} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.5" />
      </svg>
    );
  }
  // nodes
  return (
    <svg {...common}>
      <g fill="none" stroke={stroke} strokeWidth="0.6" opacity="0.5">
        <line x1="30" y1="30" x2="100" y2="50" />
        <line x1="100" y1="50" x2="170" y2="25" />
        <line x1="100" y1="50" x2="60" y2="80" />
        <line x1="100" y1="50" x2="160" y2="75" />
        <line x1="30" y1="30" x2="60" y2="80" />
        <line x1="170" y1="25" x2="160" y2="75" />
      </g>
      <g fill={stroke}>
        <circle cx="30" cy="30" r="3" /><circle cx="100" cy="50" r="4" />
        <circle cx="170" cy="25" r="3" /><circle cx="60" cy="80" r="3" />
        <circle cx="160" cy="75" r="3" />
      </g>
    </svg>
  );
}

export default function ResearchInfographic({ icon, color, pattern, topicCount, className }: Props) {
  const c = colorMap[color];
  const Icon = getIcon(icon);

  return (
    <div className={cn('relative overflow-hidden bg-gradient-to-br', c.from, c.to, className)}>
      <div className="absolute inset-0 opacity-60">
        <PatternSvg pattern={pattern} stroke={c.stroke} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
      <div className="relative h-full w-full flex items-center justify-center">
        <Icon className={cn('w-12 h-12 drop-shadow-lg', c.icon)} strokeWidth={1.5} />
      </div>
      {topicCount !== undefined && (
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-900/70 backdrop-blur-sm border border-white/10">
          <span className="text-[10px] font-mono text-white">{topicCount} topics</span>
        </div>
      )}
    </div>
  );
}
