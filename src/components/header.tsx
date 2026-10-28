import { motion } from "framer-motion"
import { useState } from "react"
import { Logo } from "@/components/logo"
import { press, spring } from "@/lib/motion"

const LINKS = [
  { href: "#lineup", label: "Lineup" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-40 bg-navy/95 text-cream backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-10">
        <a href="#top" aria-label="saysab home">
          <Logo onDark />
        </a>
        <nav className="flex items-center gap-1 md:gap-2" onMouseLeave={() => setHovered(null)}>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onMouseEnter={() => setHovered(l.href)}
              className="relative hidden px-3 py-2 text-[0.95rem] text-cream/80 transition-colors hover:text-cream sm:block"
            >
              {hovered === l.href && (
                <motion.span layoutId="nav-hover" className="absolute inset-0 rounded-full bg-white/10" transition={spring} />
              )}
              <span className="relative">{l.label}</span>
            </a>
          ))}
          <motion.a
            href="#preorder"
            {...press}
            className="ml-2 rounded-full bg-pink px-5 py-2.5 text-[0.95rem] font-semibold text-cream"
          >
            Pre-order
          </motion.a>
        </nav>
      </div>
    </header>
  )
}
