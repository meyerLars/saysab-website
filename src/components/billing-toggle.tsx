import { motion } from "framer-motion"
import { cn } from "cn"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Billing } from "@/lib/catalog"
import { spring } from "@/lib/motion"

const OPTIONS: { value: Billing; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "12-month plan" },
]

export function BillingToggle({
  value,
  onChange,
  id,
  tone = "light",
}: {
  value: Billing
  onChange: (b: Billing) => void
  id: string
  tone?: "light" | "dark"
}) {
  return (
    <ToggleGroup
      value={[value]}
      onValueChange={(v) => v[0] && onChange(v[0] as Billing)}
      spacing={0}
      className={cn("rounded-full p-1", tone === "light" ? "bg-secondary" : "bg-white/10")}
      aria-label="Billing period"
    >
      {OPTIONS.map((o) => (
        <ToggleGroupItem
          key={o.value}
          value={o.value}
          className={cn(
            "relative h-10 rounded-full! px-5 text-base hover:bg-transparent data-pressed:bg-transparent",
            tone === "light" ? "text-navy" : "text-cream",
            value === o.value && (tone === "light" ? "text-cream" : "text-navy")
          )}
        >
          {value === o.value && (
            <motion.span
              layoutId={`billing-pill-${id}`}
              className={cn("absolute inset-0 rounded-full", tone === "light" ? "bg-navy" : "bg-cream")}
              transition={spring}
            />
          )}
          <span className="relative">{o.label}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
