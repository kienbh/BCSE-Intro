import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as LucideIcons from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons = LucideIcons as any;

export function getIcon(name: string): React.ComponentType<{ className?: string; strokeWidth?: number | string }> {
  return icons[name] || icons.HelpCircle;
}
