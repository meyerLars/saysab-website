export const BULK_FROM = 100

export const PRICES = {
  unit: 449.99,
  bulkUnit: 399.0,
  alternativeAnimal: 99.99,
  modification: 49.99,
}

export type AnimalId = "bear" | "penguin" | "owl" | "elephant" | "hippo"

export const BASE_ANIMAL: AnimalId = "bear"

export const ANIMALS: { id: AnimalId; name: string; image: string; line: string; focus?: string }[] = [
  { id: "bear", name: "Bear", image: "img/baer.jpg", line: "The original. Friendly, steady and ready for any front desk.", focus: "50% 12%" },
  { id: "penguin", name: "Penguin", image: "img/pinguin.jpg", line: "Calm and upright. Made for front desks and lobbies." },
  { id: "owl", name: "Owl", image: "img/eule.jpg", line: "Wide eyes, quiet wheels. At home in libraries and info points." },
  { id: "elephant", name: "Elephant", image: "img/elefant.jpg", line: "Big ears, gentle voice. Built for clinics and waiting rooms." },
  { id: "hippo", name: "Hippo", image: "img/nilpferd.jpg", line: "Round, warm, unmissable. The showroom favourite." },
]

export type ColorId = "original" | "rose" | "sky" | "mint" | "sun" | "lavender" | "coral" | "sage"

export const COLORS: { id: ColorId; name: string; hex: string | null }[] = [
  { id: "original", name: "Original", hex: null },
  { id: "rose", name: "Rose", hex: "#f4a7c0" },
  { id: "sky", name: "Sky", hex: "#8ec5f2" },
  { id: "mint", name: "Mint", hex: "#9fe0c4" },
  { id: "sun", name: "Sun", hex: "#f7d56a" },
  { id: "lavender", name: "Lavender", hex: "#c3a8ec" },
  { id: "coral", name: "Coral", hex: "#f59a7e" },
  { id: "sage", name: "Sage", hex: "#b5c99a" },
]

export type PlanId = "translate" | "translate-sign"
export type Billing = "monthly" | "yearly"

export const PLANS: { id: PlanId; name: string; line: string; monthly: number; yearly: number; save: number }[] = [
  { id: "translate", name: "Translate", line: "Translation", monthly: 29.99, yearly: 25.99, save: 13 },
  { id: "translate-sign", name: "Translate + Sign", line: "Translation and sign language", monthly: 49.99, yearly: 39.99, save: 20 },
]

export const CONTACT = {
  name: "Selina Bährens",
  role: "Sales & Partnerships",
  email: "selina.baehrens@saysab.de",
  phone: "+49 2241 912 34 56",
  street: "Hauptstraße 21",
  city: "53757 Sankt Augustin",
}

const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" })
export const formatEur = (value: number) => eur.format(value)

export function surcharges(animal: AnimalId, color: ColorId) {
  return (animal === BASE_ANIMAL ? 0 : PRICES.alternativeAnimal) + (color === "original" ? 0 : PRICES.modification)
}

export function unitPrice(quantity: number, animal: AnimalId, color: ColorId) {
  const base = quantity >= BULK_FROM ? PRICES.bulkUnit : PRICES.unit
  return base + surcharges(animal, color)
}

export function findAnimal(id: AnimalId) {
  return ANIMALS.find((a) => a.id === id)!
}

export function findColor(id: ColorId) {
  return COLORS.find((c) => c.id === id)!
}

export function findPlan(id: PlanId) {
  return PLANS.find((p) => p.id === id)!
}
