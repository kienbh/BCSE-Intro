'use client';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: 'center' | 'left';
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  eyebrow,
  align = 'center',
  className = '',
}: SectionTitleProps) {
  const isCenter = align === 'center';
  return (
    <div className={`mb-16 ${isCenter ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-5 mb-3">
          {eyebrow}
        </p>
      )}
      {/* Fraunces serif — academic editorial, không còn generic Inter Bold */}
      <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink mb-4 tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base text-ink-4 leading-relaxed ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
      {/* Amber → sky gradient line — bỏ thick bar, dùng thin line mờ dần */}
      <div className={`mt-5 h-px rounded-full bg-gradient-to-r from-amber-500/60 via-sky-500/30 to-transparent ${isCenter ? 'w-28 mx-auto' : 'w-16'}`} />
    </div>
  );
}
