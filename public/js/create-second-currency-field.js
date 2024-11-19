async function createSecondCurrencyField(data) {
  const getCurrencyToRub = async (id) => {
    const response = await fetch(`${apiUrl}/exchange/rub-currency/${id}`);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    return parseFloat(data.exchangeRate);
  };

  const secondCurrencyContainer = document.getElementById(
    "second-currency-container"
  );
  secondCurrencyContainer.innerHTML = "";

  currencyExchangeData = data;
  const { courseExchange, displayedCourseExchange } = data;
  const exchangeRate = parseFloat(courseExchange.exchangeRate).toFixed(3);
  const displayedCourseExchangeRate = parseFloat(
    displayedCourseExchange.exchangeRate
  ).toFixed(3);
  sourceCurrencyToRub = await getCurrencyToRub(courseExchange.sourceCurrencyId);
  targetCurrencyToRub = await getCurrencyToRub(courseExchange.targetCurrencyId);
  const lowerLimit = minimum / sourceCurrencyToRub;

  const firstCurrencyAmount = document.getElementById("amount-input").value;

  const secondCurrencyHero = document.getElementById("second-currency-hero");
  secondCurrencyHero.textContent = "Что получу:";



  const card = createCurrencyCard(data.targetFinancial);
  card.id = "second-currency-card";
  card.setAttribute("financial-id", `${data.targetFinancial.id}`);

  const courseExchangeRow = createElement("div", "row p-0");
  const courseExchangeRowHTML =
    exchangeRate < 1
      ? `
      <p class="hint_color fs-14">
          1 ${courseExchange.targetCurrency.code} =
          <span class="gold-color">${displayedCourseExchangeRate} ${courseExchange.sourceCurrency.name}</span>
      </p>
  `
      : `
      <p class="hint_color fs-14">
          1 ${courseExchange.sourceCurrency.code} =
          <span class="gold-color">${displayedCourseExchangeRate} ${courseExchange.targetCurrency.name}</span>
      </p>
  `;
  courseExchangeRow.appendChild(
    createElement("div", "col ", courseExchangeRowHTML)
  );

  const alertRow = createElement("div", "row p-0 alert-row");
  const alertText = createElement("p", "gold-color fs-12 p-0");

  const secondCurrencyInputRow = createElement("div", "row p-0 mt-3");
  const secondCurrencyInput = document.createElement("input");
  secondCurrencyInput.id = "second-amount-input";
  secondCurrencyInput.type = "text";
  secondCurrencyInput.maxLength = 7;
  secondCurrencyInput.inputMode = "numeric";
  secondCurrencyInput.className = "form-control text-center m-0 p-0";
  secondCurrencyInput.placeholder = "0.0";
  secondCurrencyInput.setAttribute("autocomplete", "off");
  updateInput(firstCurrencyAmount);
  secondCurrencyInputRow.appendChild(secondCurrencyInput);

  alertRow.appendChild(alertText);

  secondCurrencyContainer.appendChild(card);
  secondCurrencyContainer.appendChild(courseExchangeRow);
  secondCurrencyContainer.appendChild(secondCurrencyInputRow);
  secondCurrencyContainer.appendChild(alertRow);

  secondCurrencyInput.addEventListener("currencyInput", () => {
    const userAmount = parseFloat(
      document.getElementById("amount-input").value
    );

    if (isNaN(userAmount) || userAmount <= 0) {
      secondCurrencyInput.value = "";
      return;
    }

    const valueWithoutFee = userAmount * courseExchange.exchangeRate;
    const rubledAmount = sourceCurrencyToRub * userAmount;
    const valueToDisplay =
      valueWithoutFee - valueWithoutFee * (getFee(rubledAmount) / 100);

    checkLimits(userAmount);

    secondCurrencyInput.value =
      valueToDisplay % 1 !== 0 ? valueToDisplay.toFixed(2) : valueToDisplay;
  });

  secondCurrencyInput.addEventListener("input", (event) => {
    const inputValue = event.target.value;
    const filteredValue = filterInputValue(inputValue);
    event.target.value = filteredValue;
    const firstCurrencyInput = document.getElementById("amount-input");
    if (event.target.value && !isNaN(event.target.value)) {
      const valueWithoutFee = event.target.value / courseExchange.exchangeRate;

      checkLimits(valueWithoutFee);

      const rubledAmount = valueWithoutFee * sourceCurrencyToRub;
      const valueToDisplay =
        valueWithoutFee + valueWithoutFee * (getFee(rubledAmount) / 100);
      if (valueToDisplay % 1 !== 0) {
        firstCurrencyInput.value = valueToDisplay.toFixed(2);
      } else {
        firstCurrencyInput.value = valueToDisplay;
      }
    } else {
      firstCurrencyInput.value = "";
    }
  });

  function checkLimits(amount) {
    if (amount >= lowerLimit) {
      alertText.textContent = "";
      isReadyToExchange = true;
    } else {
      alertText.textContent = `Минимальная сумма обмена: ${lowerLimit.toFixed(
        2
      )} ${data.sourceFinancial.currencyName}`;
      isReadyToExchange = false;
    }
  }

  function updateInput(amount) {
    if (amount && !isNaN(amount)) {
      amount = parseFloat(amount);
      checkLimits(amount);
      const rubledAmount = sourceCurrencyToRub * amount;
      amoutToDisplay = amount * courseExchange.exchangeRate;
      secondCurrencyInput.value = (
        amoutToDisplay -
        amoutToDisplay * (getFee(rubledAmount) / 100)
      ).toFixed(2);
    }
  }
}
