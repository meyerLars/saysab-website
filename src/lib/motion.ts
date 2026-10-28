import type { Transition, Variants } from "framer-motion"

export const spring: Transition = { type: "spring", stiffness: 380, damping: 30, mass: 0.8 }
export const softSpring: Transition = { type: "spring", stiffness: 140, damping: 22 }
export const bouncy: Transition = { type: "spring", stiffness: 500, damping: 18 }

export const press = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.96 },
  transition: bouncy,
}

export const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: softSpring },
}

export const revealProps = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "-80px" },
  variants: reveal,
} as const
