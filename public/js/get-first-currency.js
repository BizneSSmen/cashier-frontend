async function changeCurrency(currentCurrencyId, type) {
  let queryType = "";
  if (typeof type !== "undefined") {
    queryType = `?type=${type}`;
  }
  try {
    const response = await fetch(
      `${apiUrl}/financial/all/${currentCurrencyId}${queryType}`
    );
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    const financialsContainer = document.getElementById("first-financials");
    financialsContainer.innerHTML = "";
    data.forEach((item) => {
      const card = createCurrencyCard(item);
      card.setAttribute("financial-id", `${item.id}`);
      card.addEventListener("click", async () => {
        await loadFirstAndSecondCurrency(item.id);
        const offCanvasElement = document.getElementById("offcanvasBottom");
        const offCanvas = bootstrap.Offcanvas.getInstance(offCanvasElement);
        if (offCanvas) {
          offCanvas.hide();
        }
      });

      card.addEventListener("click", () => {
        setActiveButton(
          document.getElementById("second-currency-group-all"),
          currencyTypes,
          "second-currency-group-"
        );
      });
      financialsContainer.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
}
