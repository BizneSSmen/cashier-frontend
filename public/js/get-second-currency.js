async function loadSecondCurrencies(id, type) {
  try {
    const secondCurrencyHero = document.getElementById("second-currency-hero");
    secondCurrencyHero.textContent = "Выберите, что хотите получить:";
    const secondCurrencyContainer = document.getElementById(
      "second-currency-container"
    );
    secondCurrencyContainer.innerHTML = "";
    let queryType = "";
    if (typeof type !== "undefined") {
      queryType = `?type=${type}`;
    }
    const response = await fetch(`${apiUrl}/exchange/${id}${queryType}`);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();

    data.forEach((item) => {
      const card = createSecondCurrencyCard(item);
      secondCurrencyContainer.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
}