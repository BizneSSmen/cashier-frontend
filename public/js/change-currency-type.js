function getTypeButtons(types, prefix) {
  return types
    .map((type) => document.getElementById(`${prefix}${type}`))
    .filter((button) => button !== null);
}

function setActiveButton(activeButton, types, prefix, actionCallback) {
  const buttons = getTypeButtons(types, prefix);

  buttons.forEach((button) => {
    if (button === activeButton) {
      button.classList.add("gold-border");
    } else {
      button.classList.remove("gold-border");
    }
  });

  const currencyType = activeButton.getAttribute("currency-type");
  const firstCurrencyId = document
    .getElementById("first-currency-card")
    .getAttribute("financial-id");

  if (actionCallback !== undefined) {
    setTimeout(() => {
      actionCallback(firstCurrencyId, currencyType);
    }, 0);
  }
  if (prefix === "second-currency-group-") {
    toggleSecondCurrencyTypeButtons(true);
  }
}

function toggleSecondCurrencyTypeButtons(enable) {
  const secondCurrencyGroupContainer = document.getElementById(
    "second-currency-group-container"
  );
  if (enable) secondCurrencyGroupContainer.classList.remove("d-none");
  else secondCurrencyGroupContainer.classList.add("d-none");
}

getTypeButtons(currencyTypes, "currency-group-").forEach((button) => {
  button?.addEventListener("click", () =>
    setActiveButton(button, currencyTypes, "currency-group-", changeCurrency)
  );
});

getTypeButtons(currencyTypes, "second-currency-group-").forEach((button) => {
  button?.addEventListener("click", () =>
    setActiveButton(
      button,
      currencyTypes,
      "second-currency-group-",
      loadSecondCurrencies
    )
  );
});
