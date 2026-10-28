import { cn } from "cn"

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 118" className={cn("h-9 w-auto", className)} aria-hidden="true">
      <path d="M20 86 L54 92 L15 117 Z" fill="var(--pink)" />
      <rect x="0" y="0" width="120" height="95" rx="42" fill="var(--cream)" />
      <text
        x="60"
        y="49"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Bricolage Grotesque Variable', sans-serif"
        fontWeight="700"
        fontSize="80"
        fill="var(--navy)"
      >
        S
      </text>
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-bold tracking-tight", className)}>
      say<span className="text-pink">sab</span>
    </span>
  )
}

export function Logo({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={onDark ? undefined : "[&_rect]:fill-navy [&_text]:fill-cream"} />
      <Wordmark className="text-2xl leading-none" />
    </span>
  )
}
