import { AnimatePresence, motion } from "framer-motion"
import { cn } from "cn"
import { useState, type FormEvent, type ReactNode } from "react"
import { AnimatedPrice } from "@/components/animated-price"
import { BillingToggle } from "@/components/billing-toggle"
import { ColorSwatches } from "@/components/color-swatches"
import { RobotImage } from "@/components/robot-image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ANIMALS,
  BULK_FROM,
  CONTACT,
  PLANS,
  PRICES,
  findAnimal,
  findColor,
  findPlan,
  formatEur,
  unitPrice,
  type AnimalId,
  type Billing,
  type ColorId,
  type PlanId,
} from "@/lib/catalog"
import { bouncy, press, revealProps, softSpring, spring } from "@/lib/motion"

export type Order = {
  animal: AnimalId
  color: ColorId
  quantity: number
  plan: PlanId
  billing: Billing
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <motion.fieldset {...revealProps} className="grid gap-6 md:grid-cols-[6rem_1fr]">
      <legend className="contents">
        <span className="text-5xl font-bold text-navy/20 tabular-nums md:text-6xl">{n}</span>
      </legend>
      <div className="grid gap-5">
        <p className="text-2xl font-bold">{title}</p>
        {children}
      </div>
    </motion.fieldset>
  )
}

export function Preorder({ order, onChange }: { order: Order; onChange: (o: Partial<Order>) => void }) {
  const [sent, setSent] = useState<{ name: string; email: string } | null>(null)

  const unit = unitPrice(order.quantity, order.color)
  const hardware = unit * order.quantity
  const plan = findPlan(order.plan)
  const software = (order.billing === "yearly" ? plan.yearly : plan.monthly) * order.quantity
  const bulk = order.quantity >= BULK_FROM

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setSent({ name: String(data.get("name")), email: String(data.get("email")) })
  }

  function setQuantity(q: number) {
    onChange({ quantity: Math.min(9999, Math.max(1, Math.floor(q) || 1)) })
  }

  return (
    <section id="preorder" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
      <p className="text-sm font-semibold tracking-[0.25em] text-pink uppercase">03 · Pre-order</p>
      <h2 className="mt-6 max-w-2xl text-5xl leading-[0.95] font-bold tracking-tight md:text-7xl">
        Reserve your robots.
      </h2>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={softSpring}
            className="mt-16 grid gap-10 rounded-[2rem] bg-navy p-8 text-cream md:grid-cols-12 md:p-14"
          >
            <div className="md:col-span-7">
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...bouncy, delay: 0.15 }}
                className="inline-flex size-16 items-center justify-center rounded-full bg-pink text-3xl"
              >
                ✓
              </motion.p>
              <p className="mt-8 text-4xl leading-tight font-bold md:text-5xl">Thank you, {sent.name}.</p>
              <p className="mt-6 max-w-lg text-lg text-cream/75">
                Your pre-order for {order.quantity} × {findAnimal(order.animal).name} in{" "}
                {findColor(order.color).name} with {plan.name} is reserved. {CONTACT.name} will confirm the details
                at {sent.email} within two business days.
              </p>
              <motion.button
                type="button"
                onClick={() => setSent(null)}
                {...press}
                className="mt-10 rounded-full border-2 border-cream/30 px-6 py-3 font-semibold"
              >
                Start another pre-order
              </motion.button>
            </div>
            <dl className="grid content-start gap-3 md:col-span-4 md:col-start-9">
              <dt className="text-sm text-cream/60">One-off</dt>
              <dd className="text-3xl font-bold">{formatEur(hardware)}</dd>
              <dt className="mt-4 text-sm text-cream/60">Software per month</dt>
              <dd className="text-3xl font-bold">{formatEur(software)}</dd>
              <dd className="mt-4 font-semibold text-pink">Service included</dd>
            </dl>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            exit={{ opacity: 0, y: -20 }}
            transition={spring}
            className="mt-16 grid gap-14 md:grid-cols-12 md:gap-8"
          >
            <form id="preorder-form" onSubmit={submit} className="grid gap-16 md:col-span-7">
              <Step n="01" title="Robot">
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Animal">
                  {ANIMALS.map((a) => {
                    const selected = a.id === order.animal
                    return (
                      <motion.button
                        key={a.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => onChange({ animal: a.id })}
                        {...press}
                        className={cn(
                          "relative rounded-full px-5 py-2.5 font-semibold transition-colors",
                          selected ? "text-cream" : "bg-secondary text-navy"
                        )}
                      >
                        {selected && (
                          <motion.span layoutId="order-animal" className="absolute inset-0 rounded-full bg-navy" transition={spring} />
                        )}
                        <span className="relative">{a.name}</span>
                      </motion.button>
                    )
                  })}
                </div>

                <div>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Colour · <span className="font-semibold text-navy">{findColor(order.color).name}</span>
                    {order.color !== "original" && <> · + {formatEur(PRICES.modification)} per unit</>}
                  </p>
                  <ColorSwatches value={order.color} onChange={(color) => onChange({ color })} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center gap-3">
                    <motion.button
                      type="button"
                      aria-label="Fewer"
                      onClick={() => setQuantity(order.quantity - 1)}
                      {...press}
                      className="size-12 rounded-full bg-secondary text-2xl"
                    >
                      −
                    </motion.button>
                    <Input
                      id="quantity"
                      type="number"
                      min={1}
                      max={9999}
                      value={order.quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="h-12 w-28 rounded-full bg-white text-center text-lg font-semibold tabular-nums"
                    />
                    <motion.button
                      type="button"
                      aria-label="More"
                      onClick={() => setQuantity(order.quantity + 1)}
                      {...press}
                      className="size-12 rounded-full bg-secondary text-2xl"
                    >
                      +
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => setQuantity(BULK_FROM)}
                      {...press}
                      className="ml-1 text-sm font-semibold underline decoration-pink decoration-2 underline-offset-4"
                    >
                      {BULK_FROM} units
                    </motion.button>
                  </div>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={bulk ? "bulk" : "single"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={spring}
                      className={cn("text-sm", bulk ? "font-semibold text-pink" : "text-muted-foreground")}
                    >
                      {bulk
                        ? `Volume price active: ${formatEur(PRICES.bulkUnit)} per unit`
                        : `From ${BULK_FROM} units only ${formatEur(PRICES.bulkUnit)} per unit`}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </Step>

              <Step n="02" title="Software">
                <RadioGroup
                  value={order.plan}
                  onValueChange={(v) => onChange({ plan: v as PlanId })}
                  className="gap-3"
                  aria-label="Software subscription"
                >
                  {PLANS.map((p) => (
                    <Label
                      key={p.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-2xl px-5 py-4 text-base transition-colors",
                        order.plan === p.id ? "bg-pink-soft" : "bg-secondary/60 hover:bg-secondary"
                      )}
                    >
                      <RadioGroupItem value={p.id} />
                      <span className="flex-1">
                        <span className="block font-bold">{p.name}</span>
                        <span className="block text-sm font-normal text-muted-foreground">{p.line}</span>
                      </span>
                      <span className="font-semibold tabular-nums">
                        {formatEur(order.billing === "yearly" ? p.yearly : p.monthly)}
                        <span className="font-normal text-muted-foreground"> / mo</span>
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
                <BillingToggle id="order" value={order.billing} onChange={(billing) => onChange({ billing })} />
              </Step>

              <Step n="03" title="Contact">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required autoComplete="name" className="h-12 rounded-xl bg-white text-base" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" name="company" autoComplete="organization" className="h-12 rounded-xl bg-white text-base" />
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required autoComplete="email" className="h-12 rounded-xl bg-white text-base" />
                  </div>
                </div>
              </Step>
            </form>

            <aside className="md:col-span-4 md:col-start-9">
              <div className="overflow-hidden rounded-[2rem] bg-navy text-cream md:sticky md:top-28">
                <RobotImage
                  animal={order.animal}
                  color={order.color}
                  className="aspect-[4/3]"
                  imgClassName="object-[50%_22%]"
                />
                <div className="p-7">
                  <p className="text-lg font-semibold">
                    {order.quantity} × {findAnimal(order.animal).name}
                    <span className="font-normal text-cream/60"> · {findColor(order.color).name}</span>
                  </p>
                  <dl className="mt-6 grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 text-cream/70">
                    <dt>Per unit</dt>
                    <dd className="text-right text-cream tabular-nums">
                      <AnimatedPrice value={unit} />
                    </dd>
                    <dt>{plan.name}</dt>
                    <dd className="text-right text-cream">{order.billing === "yearly" ? "12 months" : "Monthly"}</dd>
                    <dt>Service</dt>
                    <dd className="text-right font-semibold text-pink">Included</dd>
                  </dl>
                  <div className="mt-6 grid gap-1 border-t border-cream/15 pt-6">
                    <p className="text-sm text-cream/60">One-off</p>
                    <AnimatedPrice value={hardware} className="text-4xl font-bold tabular-nums" />
                    <p className="mt-3 text-sm text-cream/60">Software per month</p>
                    <AnimatedPrice value={software} className="text-2xl font-bold tabular-nums" />
                  </div>
                  <motion.button
                    type="submit"
                    form="preorder-form"
                    {...press}
                    className="mt-8 w-full rounded-full bg-pink px-6 py-4 text-lg font-semibold"
                  >
                    Place pre-order
                  </motion.button>
                </div>
              </div>
            </aside>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
