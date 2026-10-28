const button = document.getElementById("test-button");
const counter = document.getElementById("count");
let count = 0;

button.addEventListener("click", () => {
  count += 1;
  counter.textContent = String(count);
});
