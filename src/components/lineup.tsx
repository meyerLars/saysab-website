import { AnimatePresence, motion } from "framer-motion"
import { cn } from "cn"
import { RobotImage } from "@/components/robot-image"
import { ColorSwatches } from "@/components/color-swatches"
import { AnimatedPrice } from "@/components/animated-price"
import {
  ANIMALS,
  BASE_ANIMAL,
  PRICES,
  findAnimal,
  findColor,
  formatEur,
  surcharges,
  type AnimalId,
  type ColorId,
} from "@/lib/catalog"
import { press, revealProps, spring } from "@/lib/motion"

export function Lineup({
  animal,
  color,
  onAnimal,
  onColor,
  onOrder,
}: {
  animal: AnimalId
  color: ColorId
  onAnimal: (a: AnimalId) => void
  onColor: (c: ColorId) => void
  onOrder: () => void
}) {
  const active = findAnimal(animal)
  const extras = [
    animal !== BASE_ANIMAL && `alternative animal + ${formatEur(PRICES.alternativeAnimal)}`,
    color !== "original" && `colour + ${formatEur(PRICES.modification)}`,
  ].filter(Boolean)

  return (
    <section id="lineup" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
      <motion.p {...revealProps} className="text-sm font-semibold tracking-[0.25em] text-pink uppercase">
        01 · The lineup
      </motion.p>

      <div className="mt-8 grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <motion.h2 {...revealProps} className="max-w-sm text-4xl leading-tight font-bold md:text-5xl">
            Pick an animal. Make it yours.
          </motion.h2>

          <ul className="mt-12 space-y-1" role="radiogroup" aria-label="Animal">
            {ANIMALS.map((a) => {
              const selected = a.id === animal
              return (
                <li key={a.id}>
                  <motion.button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onAnimal(a.id)}
                    whileHover={{ x: selected ? 0 : 14 }}
                    whileTap={{ scale: 0.97 }}
                    transition={spring}
                    className={cn(
                      "group flex w-full items-baseline gap-4 py-1 text-left text-[clamp(2.6rem,6vw,5rem)] leading-none font-bold tracking-tight transition-colors",
                      selected ? "text-navy" : "text-navy/25 hover:text-navy/60"
                    )}
                  >
                    <span className="w-6 shrink-0 self-center">
                      {selected && (
                        <motion.span
                          layoutId="lineup-dot"
                          className="block size-3.5 rounded-full bg-pink"
                          transition={spring}
                        />
                      )}
                    </span>
                    {a.name}
                  </motion.button>
                </li>
              )
            })}
          </ul>

          <AnimatePresence mode="wait">
            <motion.p
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={spring}
              className="mt-10 max-w-sm text-lg text-muted-foreground"
            >
              {active.line}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <RobotImage
            animal={animal}
            color={color}
            className="aspect-[4/5] rounded-[2rem] bg-secondary md:-mt-24"
          />

          <div className="mt-8">
            <p className="mb-3 text-sm text-muted-foreground">
              Colour · <span className="font-semibold text-navy">{findColor(color).name}</span>
            </p>
            <ColorSwatches value={color} onChange={onColor} />
          </div>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <AnimatedPrice
                value={PRICES.unit + surcharges(animal, color)}
                className="block text-4xl font-bold tabular-nums"
              />
              <AnimatePresence initial={false} mode="popLayout">
                <motion.p
                  key={extras.join() || "base"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={spring}
                  className="text-sm text-muted-foreground"
                >
                  {extras.length ? `incl. ${extras.join(" · ")}` : "Base product"}
                </motion.p>
              </AnimatePresence>
              <p className="text-sm font-semibold text-pink">Service included</p>
            </div>

            <motion.button
              type="button"
              onClick={onOrder}
              {...press}
              className="w-full rounded-full bg-navy px-7 py-4 text-lg font-semibold text-cream sm:w-auto"
            >
              Pre-order the {active.name.toLowerCase()}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
