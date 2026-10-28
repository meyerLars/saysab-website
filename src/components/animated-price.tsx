import { animate, useMotionValue, useTransform, motion } from "framer-motion"
import { useEffect } from "react"
import { formatEur } from "@/lib/catalog"

export function AnimatedPrice({ value, className }: { value: number; className?: string }) {
  const mv = useMotionValue(value)
  const text = useTransform(mv, (v) => formatEur(v))

  useEffect(() => {
    const controls = animate(mv, value, { type: "spring", stiffness: 160, damping: 24 })
    return controls.stop
  }, [mv, value])

  return <motion.span className={className}>{text}</motion.span>
}
