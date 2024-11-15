function createCurrencyCard(data) {
  const card = document.createElement("div");
  card.className =
    "row border rounded-2 d-flex align-items-center justify-content-between p-2 mb-2 first-currency";

  const logo = document.createElement("div");
  logo.className = "col-auto p-0";
  logo.innerHTML = `<img src="../../static/icons/${data.currencyName}.svg"></img>`;

  const financialData = document.createElement("div");
  financialData.className = "col text-start";
  financialData.innerHTML = `<p class="hint_color fs-12">${data.currencyName}</p>
                            <p class="text_color fs-17">${data.name}</p>`;

  card.appendChild(logo);
  card.appendChild(financialData);

  return card;
}
