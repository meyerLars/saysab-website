import { AnimatePresence, motion } from "framer-motion"
import { cn } from "cn"
import { findAnimal, findColor, type AnimalId, type ColorId } from "@/lib/catalog"
import { softSpring } from "@/lib/motion"

const TINT_MASK = "radial-gradient(ellipse 42% 46% at 50% 50%, #000 70%, transparent 100%)"

export function RobotImage({
  animal,
  color,
  className,
  imgClassName,
}: {
  animal: AnimalId
  color: ColorId
  className?: string
  imgClassName?: string
}) {
  const a = findAnimal(animal)
  const c = findColor(color)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.img
          key={a.id}
          src={a.image}
          alt={`${a.name} robot in ${c.name}`}
          className={cn("size-full object-cover", imgClassName)}
          initial={{ opacity: 0, scale: 1.08, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.96, x: -60 }}
          transition={softSpring}
        />
      </AnimatePresence>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{ maskImage: TINT_MASK, WebkitMaskImage: TINT_MASK }}
        animate={{ backgroundColor: c.hex ?? "rgba(255,255,255,0)" }}
        transition={softSpring}
      />
    </div>
  )
}
