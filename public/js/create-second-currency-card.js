function createSecondCurrencyCard(data) {
  const { targetFinancial, courseExchange } = data;
  const exchangeRate = parseFloat(courseExchange.exchangeRate).toFixed(3);
  const initialAmount = (0.0).toLocaleString(undefined);

  const card = createElement(
    "div",
    "second-financial-card border rounded-3 row d-flex justify-content-center py-2"
  );

  const firstRow = createElement("div", "row p-0");
  const logoHTML = `
      <div class="d-flex align-items-center">
      <img src="../../static/icons/${targetFinancial.currencyName}.svg" class="me-2 logo-mini"></img>
      <p class="hint_color fs-14">${targetFinancial.currencyName}</p>
      </div>
      <p class="hint_color fs-14">
          1 ${courseExchange.secondCurrency.code} =
          <span class="text-end gold-color">${exchangeRate} ${courseExchange.firstCurrency.name}</span>
      </p>
  `;
  firstRow.appendChild(
    createElement("div", "col d-flex justify-content-between", logoHTML)
  );

  const secondRow = createElement("div", "row p-0");
  const financialData = createElement(
    "div",
    "col d-flex justify-content-between d-flex align-items-end mt-2"
  );
  const initialAmountP = createElement(
    "p",
    "text_color fs-24 lh-1",
    "",
    initialAmount
  );

  financialData.appendChild(
    createElement(
      "p",
      "text-start text_color fs-14 text-break",
      "",
      targetFinancial.name
    )
  );
  financialData.appendChild(initialAmountP);
  secondRow.appendChild(financialData);

  card.appendChild(firstRow);
  card.appendChild(secondRow);

  const updateFinancialData = (userAmount) => {
    const amountToDisplay =
      userAmount && !isNaN(userAmount)
        ? (userAmount / courseExchange.exchangeRate).toLocaleString(undefined)
        : "0.00";
    initialAmountP.textContent = amountToDisplay;
  };

  const showLoader = () => {
    initialAmountP.innerHTML = `
          <div class="spinner-border spinner-border-sm" style="width: 1rem; height: 1rem;" role="status">
              <span class="visually-hidden">Loading...</span>
          </div>
      `;
  };

  // Обработка событий
  card.addEventListener("amountWaiting", showLoader);

  card.addEventListener("currencyInput", () => {
    const userAmount = document.getElementById("amount-input").value;
    updateFinancialData(userAmount);
  });

  card.addEventListener("click", () => {
    isSecondCurrencySelected = true;
    createSecondCurrencyField(data);
    toggleSwapButton(true);
    toggleSendButtons(true);
    toggleSecondCurrencyTypeButtons(false);
  });

  const userAmount = document.getElementById("amount-input").value;
  updateFinancialData(userAmount);

  return card;
}