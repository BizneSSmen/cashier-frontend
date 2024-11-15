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
      card.setAttribute("data-bs-dismiss", "offcanvas");
      card.addEventListener("click", () => {
        loadFirstAndSecondCurrency(item.id);
      });
      financialsContainer.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
}
