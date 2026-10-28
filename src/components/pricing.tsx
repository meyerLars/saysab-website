import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { AnimatedPrice } from "@/components/animated-price"
import { BillingToggle } from "@/components/billing-toggle"
import { BULK_FROM, PLANS, PRICES, formatEur, type Billing } from "@/lib/catalog"
import { revealProps } from "@/lib/motion"

function Row({ title, sub, children }: { title: string; sub: string; children: ReactNode }) {
  return (
    <motion.div
      {...revealProps}
      className="flex flex-col gap-2 border-b border-navy/15 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
    >
      <div>
        <p className="text-xl font-bold md:text-2xl">{title}</p>
        <p className="text-muted-foreground">{sub}</p>
      </div>
      <div className="flex items-center gap-3 text-2xl font-bold tabular-nums md:text-3xl">{children}</div>
    </motion.div>
  )
}

function Save({ children }: { children: ReactNode }) {
  return <span className="rounded-md bg-pink-soft px-2.5 py-1 text-sm font-semibold text-navy">{children}</span>
}

function Heading({ n, children }: { n: number; children: ReactNode }) {
  return (
    <p className="mt-16 border-b-2 border-navy pb-3 text-sm font-semibold tracking-[0.25em] uppercase first:mt-0">
      {n} · {children}
    </p>
  )
}

export function Pricing({ billing, onBilling }: { billing: Billing; onBilling: (b: Billing) => void }) {
  return (
    <section id="pricing" className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-12 md:gap-8 md:px-10 md:py-36">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <p className="text-sm font-semibold tracking-[0.25em] text-pink uppercase">02 · Pricing</p>
            <h2 className="mt-6 text-5xl leading-[0.95] font-bold tracking-tight md:text-6xl">
              Price list
              <br />
              <span className="text-navy/30">2026</span>
            </h2>
            <p className="mt-8 max-w-xs text-muted-foreground">
              All prices in euros. The volume price applies per unit from {BULK_FROM} units. The 12-month plan is
              billed at the reduced monthly rate for a 12-month term.
            </p>
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <Heading n={1}>Product</Heading>
          <Row title="Robot" sub={`Penguin, Owl, Elephant or Hippo · charged via cable · 1–${BULK_FROM - 1} units`}>
            {formatEur(PRICES.unit)}
          </Row>
          <Row title="Volume price" sub={`Per unit from ${BULK_FROM} units`}>
            <Save>Save 11%</Save>
            {formatEur(PRICES.bulkUnit)}
          </Row>
          <Row title="Service included" sub="Maintenance and repairs of faults not caused by the customer">
            <span className="text-pink">Included</span>
          </Row>

          <Heading n={2}>Personalization</Heading>
          <Row title="Colour modification" sub="Each change from the original colour">
            + {formatEur(PRICES.modification)}
          </Row>

          <div className="mt-16 flex flex-col gap-4 border-b-2 border-navy pb-3 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-sm font-semibold tracking-[0.25em] uppercase">3 · Software subscription · per month</p>
            <BillingToggle id="pricing" value={billing} onChange={onBilling} />
          </div>
          {PLANS.map((p) => (
            <Row key={p.id} title={p.name} sub={p.line}>
              {billing === "yearly" && <Save>Save {p.save}%</Save>}
              <AnimatedPrice value={billing === "yearly" ? p.yearly : p.monthly} />
            </Row>
          ))}
        </div>
      </div>
    </section>
  )
}
