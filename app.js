const BULK_FROM = 100;

const VARIANTS = {
  basic: { name: "Basic", price: 3990, bulkPrice: 3490 },
  personal: { name: "Personalisiert", price: 4490, bulkPrice: 3990 },
};

const ANIMALS = [
  { id: "pinguin", name: "Pinguin", text: "Der Klassiker für den Empfang. Begrüßt Gäste und zeigt den Weg." },
  { id: "eule", name: "Eule", text: "Die Kluge. Ideal für Infopunkte, Bibliotheken und Messen." },
  { id: "elefant", name: "Elefant", text: "Der Sanfte. Perfekt für Kliniken, Kitas und Wartebereiche." },
  { id: "nilpferd", name: "Nilpferd", text: "Der Gemütliche. Ein Hingucker in Lobbys und Showrooms." },
];

const COLORS = [
  { id: "original", name: "Original", hex: null },
  { id: "rosa", name: "Rosa", hex: "#f4a7c0" },
  { id: "himmelblau", name: "Himmelblau", hex: "#8ec5f2" },
  { id: "mint", name: "Mint", hex: "#9fe0c4" },
  { id: "sonnengelb", name: "Sonnengelb", hex: "#f7d56a" },
  { id: "lavendel", name: "Lavendel", hex: "#c3a8ec" },
  { id: "koralle", name: "Koralle", hex: "#f59a7e" },
  { id: "salbei", name: "Salbei", hex: "#b5c99a" },
];

const PLANS = [
  { id: "start", name: "Start", monthly: 49, yearly: 39, features: ["Begrüßung und Infos am Display", "Sprachausgabe auf Deutsch und Englisch", "Fernwartung"] },
  { id: "business", name: "Business", monthly: 99, yearly: 79, popular: true, features: ["Alles aus Start", "Besucheranmeldung und Termine", "Wegeführung im Gebäude", "Statistiken"] },
  { id: "premium", name: "Premium", monthly: 199, yearly: 159, features: ["Alles aus Business", "KI-Gespräche in 20 Sprachen", "Eigene Inhalte und Branding", "Schnittstellen zu deinen Systemen"] },
];

const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const $ = (sel) => document.querySelector(sel);

function unitPrice(variant, quantity) {
  const v = VARIANTS[variant];
  return quantity >= BULK_FROM ? v.bulkPrice : v.price;
}

function setRobot(el, animalId, colorId) {
  const animal = ANIMALS.find((a) => a.id === animalId);
  const color = COLORS.find((c) => c.id === colorId);
  const img = el.querySelector("img");
  img.src = `img/${animal.id}.jpg`;
  img.alt = `${animal.name} in ${color.name}`;
  el.style.setProperty("--tint", color.hex || "transparent");
}

function renderSwatches(container, selected, enabled, onPick) {
  container.innerHTML = "";
  for (const color of COLORS) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "swatch";
    b.title = color.name;
    b.setAttribute("aria-label", color.name);
    b.setAttribute("aria-pressed", String(color.id === selected));
    b.style.background = color.hex || "linear-gradient(135deg, #f3efe9 50%, #8a8f99 50%)";
    b.disabled = !enabled && color.id !== "original";
    b.addEventListener("click", () => onPick(color.id));
    container.append(b);
  }
}

function renderStaticPrices() {
  for (const [id, v] of Object.entries(VARIANTS)) {
    document.querySelector(`[data-price="${id}"]`).textContent = `${euro.format(v.price)} pro Stück`;
    document.querySelector(`[data-price="${id}-bulk"]`).textContent = `ab ${BULK_FROM} Stück nur ${euro.format(v.bulkPrice)}`;
    $("#product-table").insertAdjacentHTML(
      "beforeend",
      `<tr><td>${v.name}</td><td>${euro.format(v.price)}</td><td>${euro.format(v.bulkPrice)}</td><td>inklusive</td></tr>`
    );
  }
  for (const p of PLANS) {
    $("#plan-table").insertAdjacentHTML(
      "beforeend",
      `<tr><td>${p.name}</td><td>${euro.format(p.monthly)}</td><td>${euro.format(p.yearly)} <span class="muted">(${euro.format(p.yearly * 12)} / Jahr)</span></td></tr>`
    );
  }
}

function renderAnimalGrid() {
  const grid = $("#animal-grid");
  for (const animal of ANIMALS) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "animal-card";
    card.innerHTML = `
      <div class="robot"><img src="img/${animal.id}.jpg" alt="${animal.name}" loading="lazy"></div>
      <span class="animal-name">${animal.name}</span>
      <span class="muted">ab ${euro.format(VARIANTS.basic.price)}</span>`;
    card.addEventListener("click", () => openDialog(animal.id));
    grid.append(card);
  }
}

let billing = "monthly";

function renderPlans() {
  const wrap = $("#plans");
  wrap.innerHTML = "";
  for (const p of PLANS) {
    const price = p[billing];
    const sub = billing === "yearly"
      ? `jährlich abgerechnet: ${euro.format(price * 12)}`
      : "monatlich kündbar";
    wrap.insertAdjacentHTML(
      "beforeend",
      `<article class="plan${p.popular ? " popular" : ""}">
        ${p.popular ? '<span class="tag">Beliebt</span>' : ""}
        <h3>${p.name}</h3>
        <p class="price">${euro.format(price)}<span class="muted"> / Monat</span></p>
        <p class="price-sub">${sub}</p>
        <ul>${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
        <button type="button" class="button" data-plan="${p.id}">Auswählen</button>
      </article>`
    );
  }
  wrap.querySelectorAll("[data-plan]").forEach((b) =>
    b.addEventListener("click", () => {
      const form = $("#order-form");
      form.plan.value = b.dataset.plan;
      form.billing.value = billing;
      updateOrder();
      $("#vorbestellen").scrollIntoView({ behavior: "smooth" });
    })
  );
}

document.querySelectorAll("[data-billing]").forEach((b) =>
  b.addEventListener("click", () => {
    billing = b.dataset.billing;
    document.querySelectorAll("[data-billing]").forEach((x) =>
      x.setAttribute("aria-checked", String(x === b))
    );
    renderPlans();
  })
);

const dialog = $("#product-dialog");
const dialogState = { animal: "pinguin", variant: "basic", color: "original" };

function renderDialog() {
  const { animal, variant, color } = dialogState;
  const a = ANIMALS.find((x) => x.id === animal);
  $("#dialog-title").textContent = `${a.name} · ${VARIANTS[variant].name}`;
  $("#dialog-text").textContent = a.text;
  setRobot($("#dialog-robot"), animal, color);
  renderSwatches($("#dialog-swatches"), color, variant === "personal", (id) => {
    dialogState.color = id;
    renderDialog();
  });
  $("#dialog-price").textContent = `${euro.format(VARIANTS[variant].price)} pro Stück`;
  $("#dialog-price-bulk").textContent = `ab ${BULK_FROM} Stück nur ${euro.format(VARIANTS[variant].bulkPrice)}`;
  dialog.querySelectorAll('[name="dialog-variant"]').forEach((r) => (r.checked = r.value === variant));
}

function openDialog(animalId) {
  dialogState.animal = animalId;
  dialogState.variant = "basic";
  dialogState.color = "original";
  renderDialog();
  dialog.showModal();
}

dialog.querySelectorAll('[name="dialog-variant"]').forEach((r) =>
  r.addEventListener("change", () => {
    dialogState.variant = r.value;
    if (r.value === "basic") dialogState.color = "original";
    else if (dialogState.color === "original") dialogState.color = COLORS[1].id;
    renderDialog();
  })
);

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});

$("#dialog-order").addEventListener("click", () => {
  const form = $("#order-form");
  form.animal.value = dialogState.animal;
  form.variant.value = dialogState.variant;
  orderColor = dialogState.color;
  dialog.close();
  updateOrder();
  $("#vorbestellen").scrollIntoView({ behavior: "smooth" });
});

let orderColor = "original";

function readOrder() {
  const form = $("#order-form");
  const quantity = Math.max(1, Math.floor(Number(form.quantity.value) || 1));
  return {
    animal: form.animal.value,
    variant: form.variant.value,
    color: form.variant.value === "basic" ? "original" : orderColor,
    quantity,
    plan: PLANS.find((p) => p.id === form.plan.value),
    billing: form.billing.value,
  };
}

function updateOrder() {
  const o = readOrder();
  if (o.variant === "personal" && orderColor === "original") orderColor = COLORS[1].id;
  if (o.variant === "basic") orderColor = "original";
  o.color = orderColor;

  setRobot($("#order-preview"), o.animal, o.color);
  renderSwatches($("#order-swatches"), o.color, o.variant === "personal", (id) => {
    orderColor = id;
    updateOrder();
  });

  const unit = unitPrice(o.variant, o.quantity);
  const hardware = unit * o.quantity;
  const monthly = o.plan[o.billing] * o.quantity;
  const animal = ANIMALS.find((a) => a.id === o.animal);
  const color = COLORS.find((c) => c.id === o.color);
  const bulkHint = o.quantity >= BULK_FROM
    ? `<span class="ok">Mengenpreis ab ${BULK_FROM} Stück aktiv</span>`
    : `<span class="muted">ab ${BULK_FROM} Stück nur ${euro.format(VARIANTS[o.variant].bulkPrice)}</span>`;

  $("#order-summary").innerHTML = `
    <dt>Roboter</dt><dd>${o.quantity} × ${animal.name}, ${VARIANTS[o.variant].name}, ${color.name}</dd>
    <dt>Stückpreis</dt><dd>${euro.format(unit)}<br>${bulkHint}</dd>
    <dt>Hardware einmalig</dt><dd><strong>${euro.format(hardware)}</strong></dd>
    <dt>Software</dt><dd>${o.plan.name}, ${o.billing === "yearly" ? "Jahresvertrag" : "monatlich"}</dd>
    <dt>Software pro Monat</dt><dd><strong>${euro.format(monthly)}</strong>${o.billing === "yearly" ? `<br><span class="muted">${euro.format(monthly * 12)} pro Jahr</span>` : ""}</dd>
    <dt>Service</dt><dd>inklusive</dd>`;
  return { o, hardware, monthly, animal, color };
}

function initOrderForm() {
  const form = $("#order-form");
  form.animal.innerHTML = ANIMALS.map((a) => `<option value="${a.id}">${a.name}</option>`).join("");
  form.plan.innerHTML = PLANS.map((p) => `<option value="${p.id}">${p.name}</option>`).join("");
  form.plan.value = "business";
  form.addEventListener("input", updateOrder);
  form.addEventListener("change", updateOrder);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { o, hardware, monthly, animal, color } = updateOrder();
    $("#confirmation-text").textContent =
      `${form.elements.namedItem("name").value}, deine Vorbestellung über ${o.quantity} × ${animal.name} (${VARIANTS[o.variant].name}, ${color.name}) ` +
      `für ${euro.format(hardware)} plus Software ${o.plan.name} für ${euro.format(monthly)} pro Monat ist vorgemerkt. ` +
      `Service ist inklusive. (Demo: es wurden keine Daten gesendet.)`;
    $(".order").hidden = true;
    $("#confirmation").hidden = false;
  });
  $("#new-order").addEventListener("click", () => {
    form.reset();
    form.plan.value = "business";
    orderColor = "original";
    updateOrder();
    $(".order").hidden = false;
    $("#confirmation").hidden = true;
  });
  updateOrder();
}

renderStaticPrices();
renderAnimalGrid();
renderPlans();
initOrderForm();
