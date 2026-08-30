'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';

const HERO_SLIDES = [
  { src: '/images/facilities/room-3204.jpg', fit: 'cover' },
  { src: '/images/facilities/robotics.jpg', fit: 'contain' },
  { src: '/images/facilities/iot-lab.jpg', fit: 'contain' },
  { src: '/images/facilities/workshop.jpg', fit: 'cover' },
  { src: '/images/facilities/manufacture.jpg', fit: 'contain' },
  { src: '/images/facilities/room-502.jpg', fit: 'cover' },
  { src: '/images/facilities/servers.jpg', fit: 'contain' },
] as const;
const ROTATE_MS = 5500;

export default function HeroSection() {
  const { t, lang } = useLang();
  const heroTitle3 = t('hero.title3');
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-bg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Photo slides */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 bg-center bg-no-repeat transition-opacity duration-[1600ms] ease-in-out ${
              i === idx ? 'opacity-85' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${slide.src}')`,
              backgroundSize: slide.fit === 'contain' ? 'min(88vw, 980px) auto' : 'cover',
              backgroundPosition: slide.fit === 'contain' ? '72% center' : 'center',
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/38 via-slate-950/20 to-slate-950/88" />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(2,6,23,0.90)_0%,rgba(2,6,23,0.68)_34%,rgba(15,23,42,0.12)_64%,rgba(2,6,23,0.42)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-slate-950/92 via-slate-950/44 to-transparent" />

      {/* Warm academic glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_56%_46%_at_74%_30%,rgba(14,165,233,0.11),transparent_66%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_48%_42%_at_35%_58%,rgba(251,191,36,0.08),transparent_64%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_46%_55%_at_4%_90%,rgba(99,102,241,0.09),transparent_64%)]" />

      {/* Subtle grid — fades toward bottom */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)',
        }}
      />

      <div className="on-media relative z-10 flex min-h-screen items-center px-5 sm:px-8 lg:px-12">
        <div className="w-full max-w-7xl mx-auto pt-24 pb-24 animate-fade-in">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-amber-300/70" />
              <p className="font-mono text-[10px] uppercase text-amber-200/90" style={{ letterSpacing: '0.22em' }}>
                Vietnam Japan University · Hà Nội
              </p>
            </div>

            <h1
              className="mb-5 font-sans text-[4.6rem] font-extrabold leading-[0.86] text-ink drop-shadow-[0_24px_70px_rgba(0,0,0,0.45)] sm:text-[6.2rem] md:text-[7.4rem] lg:text-[8.2rem]"
              style={{ letterSpacing: '0' }}
            >
              <span className="gold-shine-text" data-text="BCSE">
                BCSE
              </span>
            </h1>

            <p className="max-w-3xl text-2xl font-semibold leading-tight text-ink sm:text-3xl md:text-4xl" style={{ letterSpacing: '0' }}>
              {t('hero.title1')}{' '}
              <span className="bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
                {t('hero.title2')}
              </span>
              {' '}
              {heroTitle3.includes('Engineering') ? (
                <>
                  {heroTitle3.replace('Engineering', '')}
                  <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-teal-300 bg-clip-text text-transparent">
                    Engineering
                  </span>
                </>
              ) : (
                <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-teal-300 bg-clip-text text-transparent">
                  {heroTitle3}
                </span>
              )}
            </p>

            <p className="mt-5 max-w-2xl text-base font-normal leading-8 text-ink-3 md:text-lg">
              {t('hero.tagline')}
            </p>

            <div className="mt-6 flex max-w-2xl flex-wrap gap-2">
              {t('hero.bullets').split('•').map((item) => (
                <span
                  key={item.trim()}
                  className="rounded-full border border-line/10 bg-fill/[0.045] px-3 py-1.5 text-xs font-medium text-ink-3 backdrop-blur-sm"
                >
                  {item.trim()}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#philosophy"
                className="px-8 py-3.5 text-sm font-bold text-slate-950 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 transition-all shadow-[0_18px_55px_rgba(245,158,11,0.28)] hover:brightness-110 hover:shadow-[0_20px_70px_rgba(245,158,11,0.38)]"
              >
                {t('hero.ctaPrimary')}
              </a>
              <Link
                href="/contact"
                className="px-8 py-3.5 text-sm font-semibold rounded-xl border border-line/15 bg-fill/[0.035] text-ink/90 backdrop-blur-md transition-all hover:border-amber-300/50 hover:bg-amber-300/[0.08] hover:text-amber-100"
              >
                {t('hero.ctaSecondary')}
              </Link>
            </div>

            {/* Slide indicators */}
            <div className="mt-12 flex gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1 rounded-full transition-all ${
                    i === idx ? 'w-9 bg-gradient-to-r from-amber-300 to-sky-300' : 'w-1.5 bg-fill/20 hover:bg-fill/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue inspired by Delta Lab */}
      <div className="hero-scroll-cue" aria-hidden="true">
        <span>{lang === 'en' ? 'Explore' : lang === 'ja' ? '探索' : 'Khám phá'}</span>
        <i />
      </div>
    </section>
  );
}
