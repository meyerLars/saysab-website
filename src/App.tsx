import { useState } from "react"
import { Contact } from "@/components/contact"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Lineup } from "@/components/lineup"
import { Logo } from "@/components/logo"
import { Preorder, type Order } from "@/components/preorder"
import { Pricing } from "@/components/pricing"
import { ServiceBand } from "@/components/service-band"
import { CONTACT } from "@/lib/catalog"

export default function App() {
  const [order, setOrder] = useState<Order>({
    animal: "penguin",
    color: "original",
    quantity: 1,
    plan: "translate",
    billing: "monthly",
  })

  const update = (patch: Partial<Order>) => setOrder((o) => ({ ...o, ...patch }))

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Lineup
          animal={order.animal}
          color={order.color}
          onAnimal={(animal) => update({ animal })}
          onColor={(color) => update({ color })}
          onOrder={() => document.getElementById("preorder")?.scrollIntoView({ behavior: "smooth" })}
        />
        <ServiceBand />
        <Pricing billing={order.billing} onBilling={(billing) => update({ billing })} />
        <Preorder order={order} onChange={update} />
        <Contact />
      </main>
      <footer className="bg-navy text-cream/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-10">
          <Logo onDark />
          <p>
            {CONTACT.street} · {CONTACT.city}
          </p>
        </div>
      </footer>
    </>
  )
}
