async function toggleSwapButton(enable) {
  const swapButton = document.getElementById("swap-button");

  if (enable) {
    if (!swapButton.classList.contains("enabled-swap-button")) {
      swapButton.classList.replace(
        "disabled-swap-button",
        "enabled-swap-button"
      );
      swapButton.addEventListener("click", handleSwapClick);
    }
  } else {
    if (!swapButton.classList.contains("disabled-swap-button")) {
      swapButton.classList.replace(
        "enabled-swap-button",
        "disabled-swap-button"
      );
      swapButton.removeEventListener("click", handleSwapClick);
    }
  }
}

async function handleSwapClick() {
  try {
    const sourceCurrencyId = document
      .getElementById("first-currency-card")
      .getAttribute("financial-id");
    const targetCurrencyId = document
      .getElementById("second-currency-card")
      .getAttribute("financial-id");

    const response = await fetch(`${apiUrl}/exchange/${targetCurrencyId}`);

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const data = await response.json();
    loadFirstCurrency(targetCurrencyId);
    createSecondCurrencyField(
      data.filter(
        (currency) => currency.targetFinancial.id == sourceCurrencyId
      )[0]
    );
  } catch (error) {
    console.log(error);
  }
}
