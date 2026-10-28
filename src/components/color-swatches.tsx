import { motion } from "framer-motion"
import { useId } from "react"
import { cn } from "cn"
import { COLORS, type ColorId } from "@/lib/catalog"
import { bouncy, spring } from "@/lib/motion"

export function ColorSwatches({
  value,
  onChange,
  className,
}: {
  value: ColorId
  onChange: (c: ColorId) => void
  className?: string
}) {
  const id = useId()
  return (
    <div role="radiogroup" aria-label="Colour" className={cn("flex flex-wrap gap-2.5", className)}>
      {COLORS.map((c) => {
        const selected = c.id === value
        return (
          <motion.button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={c.name}
            title={c.name}
            onClick={() => onChange(c.id)}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.85 }}
            transition={bouncy}
            className="relative size-9 rounded-full"
          >
            {selected && (
              <motion.span
                layoutId={`swatch-ring-${id}`}
                className="absolute -inset-1 rounded-full border-2 border-navy"
                transition={spring}
              />
            )}
            <span
              className="absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgb(19_32_60/0.15)]"
              style={{
                background: c.hex ?? "conic-gradient(var(--cream) 0 50%, #8a8f99 0 100%)",
              }}
            />
          </motion.button>
        )
      })}
    </div>
  )
}
