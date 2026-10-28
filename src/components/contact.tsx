import { motion } from "framer-motion"
import { LogoMark, Wordmark } from "@/components/logo"
import { CONTACT } from "@/lib/catalog"
import { revealProps, softSpring } from "@/lib/motion"

export function Contact() {
  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-12 md:gap-8 md:px-10 md:py-36">
        <div className="md:col-span-4">
          <p className="text-sm font-semibold tracking-[0.25em] text-pink uppercase">04 · Contact</p>
          <motion.h2 {...revealProps} className="mt-6 text-4xl leading-tight font-bold md:text-5xl">
            Questions first? Talk to a person.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, rotate: -4, y: 60 }}
          whileInView={{ opacity: 1, rotate: -1.5, y: 0 }}
          whileHover={{ rotate: 0, scale: 1.015 }}
          viewport={{ once: true }}
          transition={softSpring}
          className="rounded-[1.5rem] bg-navy p-8 text-cream md:col-span-7 md:col-start-6 md:p-12"
        >
          <div className="flex items-start gap-6 md:gap-10">
            <LogoMark className="h-20 shrink-0 md:h-28" />
            <div>
              <p className="text-[clamp(2.4rem,5vw,4rem)] leading-[0.95] font-bold tracking-tight">
                {CONTACT.name.split(" ")[0]}
                <br />
                {CONTACT.name.split(" ")[1]}
              </p>
              <Wordmark className="mt-3 block text-xl" />
            </div>
          </div>

          <div className="mt-12 grid gap-6 text-lg sm:grid-cols-2">
            <div>
              <p className="text-sm text-cream/60">{CONTACT.role}</p>
              <a href={`mailto:${CONTACT.email}`} className="mt-2 block break-all hover:text-pink">
                {CONTACT.email}
              </a>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="block hover:text-pink">
                {CONTACT.phone}
              </a>
            </div>
            <div>
              <p className="text-sm text-cream/60">Office</p>
              <p className="mt-2">
                {CONTACT.street}
                <br />
                {CONTACT.city}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
