import { motion } from "framer-motion"
import { softSpring } from "@/lib/motion"

export function ServiceBand() {
  return (
    <section className="overflow-hidden bg-pink text-cream">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <motion.h2
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={softSpring}
          className="text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] font-bold tracking-[-0.03em] md:col-span-8"
        >
          Service included.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...softSpring, delay: 0.1 }}
          className="max-w-xs self-end text-lg md:col-span-4 md:justify-self-end"
        >
          Every robot comes with maintenance and repairs of faults not caused by the customer. No extra contract, no
          extra cost.
        </motion.p>
      </div>
    </section>
  )
}
