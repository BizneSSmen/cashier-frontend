function createForeignCard(data) {
  const { targetFinancial } = data;
  const card = createElement(
    "div",
    "second-financial-card border rounded-3 text-start row py-2 mb-2"
  );

  const firstRow = createElement("div", "row mb-2");
  firstRow.innerHTML = `<p class="gold-color fs-14">${targetFinancial.currencyName}</p>`;

  const secondRow = createElement("div", "row");
  secondRow.innerHTML = `<p class="text_color fs-14">${targetFinancial.name}</p>`;

  card.appendChild(firstRow);
  card.appendChild(secondRow);

  card.addEventListener("click", () => {
    earse(data);
  });

  return card;
}

function earse(data) {
  currencyExchangeData = data;
  toggleSecondCurrencyTypeButtons(false);
  tgObject.SecondaryButton.text = "Назад к списку валют";
  tgObject.BackButton.onClick(resetgroupButtons);
  tgObject.BackButton.onClick(backToCurrencies);
  tgObject.SecondaryButton.offClick(openBot);
  tgObject.SecondaryButton.onClick(resetgroupButtons);
  tgObject.SecondaryButton.onClick(backToCurrencies);
  tgObject.MainButton.show();
  tgObject.BackButton.show();

  isReadyToExchangeForeign = true;

  const secondCurrencyContainer = document.getElementById(
    "second-currency-container"
  );
  secondCurrencyContainer.innerHTML = "";

  const secondCurrencyHero = document.getElementById("second-currency-hero");
  secondCurrencyHero.textContent = "Что получу:";

  const foreignCard = createForeignCard(data);

  const courseInfoRow = createElement("div", "row my-5");
  courseInfoRow.innerHTML = `<p class="text_color fs-20">Курс по договорённости</p>`;

  secondCurrencyContainer.appendChild(foreignCard);
  secondCurrencyContainer.appendChild(courseInfoRow);
}
