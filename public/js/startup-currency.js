async function loadFirstCurrency(id, type) {
  try {
    const response = await fetch(`${apiUrl}/financial/${id}`);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();

    const firstCurrencyContainer = document.getElementById(
      "first-currency-container"
    );
    firstCurrencyContainer.innerHTML = "";

    const card = createCurrencyCard(data);
    card.id = "first-currency-card";
    card.setAttribute("financial-id", `${data.id}`);
    card.addEventListener("click", () => changeCurrency(data.id, type));
    card.addEventListener("click", () => {
      setActiveButton(
        document.getElementById("currency-group-all"),
        currencyTypes,
        "currency-group-"
      );
    });

    firstCurrencyContainer.appendChild(card);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function loadFirstAndSecondCurrency(id) {
  const data = await loadFirstCurrency(id);
  await loadSecondCurrencies(data.id);
}

loadFirstAndSecondCurrency(1);
