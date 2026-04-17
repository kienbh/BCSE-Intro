import type { DictKey } from '@/lib/i18n';

export interface NavItem {
  labelKey: DictKey;
  href: string;
}

export const navItems: NavItem[] = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.curriculum', href: '/curriculum' },
  { labelKey: 'nav.research', href: '/research' },
  { labelKey: 'nav.facilities', href: '/facilities' },
  { labelKey: 'nav.faculty', href: '/faculty' },
  { labelKey: 'nav.services', href: '/services' },
  { labelKey: 'nav.contact', href: '/contact' },
];

export const ctaButton = {
  labelKey: 'nav.cta' as DictKey,
  href: 'https://vju.ac.vn/ttts2026/',
  external: true,
};
