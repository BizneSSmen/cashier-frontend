const inputEvent = new CustomEvent("currencyInput");
const amountWaitingEvent = new CustomEvent("amountWaiting");
let inputTimeout;
let isWaitingEventTriggered = false;

const filterInputValue = (inputValue) => {
  return inputValue
    .replace(/[^0-9.]/g, "")
    .replace(/^\./, "")
    .replace(/^0+(\d)/, "$1")
    .replace(/(\..*)\./g, "$1");
};

document.getElementById("amount-input").addEventListener("input", (event) => {
  const inputValue = event.target.value;
  const filteredValue = filterInputValue(inputValue);
  event.target.value = filteredValue;

  clearTimeout(inputTimeout);
  const cards = document.querySelectorAll(".second-financial-card");

  if (!isWaitingEventTriggered) {
    cards.forEach((el) => {
      el.dispatchEvent(amountWaitingEvent);
    });
    isWaitingEventTriggered = true;
  }

  inputTimeout = setTimeout(() => {
    cards.forEach((el) => {
      el.dispatchEvent(inputEvent);
    });
    isWaitingEventTriggered = false;
  }, 2000);

  if (isSecondCurrencySelected) {
    const secondCurrencyInput = document.getElementById("second-amount-input");
    secondCurrencyInput.dispatchEvent(inputEvent);
  }
});
