import { motion } from "framer-motion"
import { BULK_FROM, PRICES, formatEur } from "@/lib/catalog"
import { press, softSpring } from "@/lib/motion"

const words = ["Every", "word,"]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-14 md:grid-cols-12 md:px-10 md:pt-24">
        <div className="md:col-span-7 md:pb-28">
          <h1 className="text-[clamp(3.4rem,10vw,8.5rem)] leading-[0.88] font-bold tracking-[-0.03em]">
            {words.map((w, i) => (
              <motion.span
                key={w}
                className="mr-[0.2em] inline-block"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...softSpring, delay: i * 0.08 }}
              >
                {w}
              </motion.span>
            ))}
            <br />
            <motion.span
              className="inline-block text-pink"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...softSpring, delay: 0.2 }}
            >
              understood.
            </motion.span>
          </h1>

          <motion.p
            className="mt-8 max-w-md text-lg text-cream/75 md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            Friendly robots that translate spoken language and sign language. For reception desks, clinics, offices
            and events.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...softSpring, delay: 0.55 }}
          >
            <motion.a
              href="#preorder"
              {...press}
              className="rounded-full bg-pink px-7 py-4 text-lg font-semibold text-cream"
            >
              Pre-order now
            </motion.a>
            <a href="#lineup" className="text-lg underline decoration-pink decoration-2 underline-offset-8">
              Meet the lineup
            </a>
          </motion.div>

          <dl className="mt-16 grid max-w-lg grid-cols-2 gap-y-2 text-cream/70">
            <dt className="text-sm tracking-[0.2em] uppercase">From</dt>
            <dd className="text-right text-cream md:text-left">{formatEur(PRICES.unit)}</dd>
            <dt className="text-sm tracking-[0.2em] uppercase">{BULK_FROM}+ units</dt>
            <dd className="text-right text-cream md:text-left">{formatEur(PRICES.bulkUnit)} each</dd>
            <dt className="text-sm tracking-[0.2em] uppercase">Service</dt>
            <dd className="text-right font-semibold text-pink md:text-left">Included</dd>
          </dl>
        </div>

        <motion.div
          className="relative -mx-5 md:col-span-5 md:mx-0 md:-mr-10 md:self-end"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.15 }}
        >
          <img
            src="img/pinguin.jpg"
            alt="saysab penguin robot"
            className="h-[26rem] w-full object-cover object-top md:h-[44rem] md:rounded-tl-[3rem]"
          />
        </motion.div>
      </div>
    </section>
  )
}
