function createSecondCurrencyField(data) {
  currencyExchangeData = data;
  console.log(data)
  const { courseExchange,  displayedCourseExchange} = data;
  const exchangeRate = parseFloat(courseExchange.exchangeRate).toFixed(3);
  const displayedCourseExchangeRate = parseFloat(displayedCourseExchange.exchangeRate).toFixed(3)
  const firstCurrencyAmount = document.getElementById("amount-input").value;

  const secondCurrencyHero = document.getElementById("second-currency-hero");
  secondCurrencyHero.textContent = "Что получу:";

  const secondCurrencyContainer = document.getElementById(
    "second-currency-container"
  );
  secondCurrencyContainer.innerHTML = "";

  const card = createCurrencyCard(data.targetFinancial);
  card.id = "second-currency-card";
  card.setAttribute("financial-id", `${data.targetFinancial.id}`);

  const courseExchangeRow = createElement("div", "row p-0");
  const courseExchangeRowHTML = exchangeRate < 1 ? `
      <p class="hint_color fs-14">
          1 ${courseExchange.targetCurrency.code} =
          <span class="gold-color">${displayedCourseExchangeRate} ${courseExchange.sourceCurrency.name}</span>
      </p>
  ` : `
      <p class="hint_color fs-14">
          1 ${courseExchange.sourceCurrency.code} =
          <span class="gold-color">${displayedCourseExchangeRate} ${courseExchange.targetCurrency.name}</span>
      </p>
  ` ;
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

    const valueToDisplay = userAmount * courseExchange.exchangeRate;

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
      const valueToDisplay = event.target.value * courseExchange.exchangeRate;

      checkLimits(valueToDisplay);

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
    const lowerLimit = parseFloat(data.lowerLimit);
    const uppererLimit = parseFloat(data.upperLimit);

    if (amount < lowerLimit) {
      alertText.textContent = `Минимальная сумма обмена: ${lowerLimit} ${data.sourceFinancial.currencyName}`;
      isReadyToExchange = false;
    } else if (amount > uppererLimit) {
      alertText.textContent = `Максимальная сумма обмена: ${uppererLimit} ${data.sourceFinancial.currencyName}`;
      isReadyToExchange = false;
    } else {
      alertText.textContent = "";
      isReadyToExchange = true;
    }
  }

  function updateInput(amount) {
    checkLimits(amount);
    if (amount && !isNaN(amount)) {
      secondCurrencyInput.value = (
        amount / courseExchange.exchangeRate
      ).toFixed(2);
    }
  }
}
