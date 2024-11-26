function resetgroupButtons() {
  setActiveButton(
    document.getElementById("second-currency-group-all"),
    currencyTypes,
    "second-currency-group-"
  );
}

function backToCurrencies() {
  tgObject.SecondaryButton.offClick(resetgroupButtons);
  tgObject.SecondaryButton.offClick(backToCurrencies);
  tgObject.SecondaryButton.onClick(openBot);
  tgObject.SecondaryButton.text = "Бесплатная консультация";
  tgObject.MainButton.hide();
  isSecondCurrencySelected = false;
  isReadyToExchangeForeign = false;
  currencyExchangeData = {};
  toggleSwapButton(false);
  toggleOffcanvas(true);
  toggleSecondCurrencyTypeButtons(true);
  const firstCurrencyId = document
    .getElementById("first-currency-card")
    .getAttribute("financial-id");
  loadSecondCurrencies(firstCurrencyId);
}

async function makeClaim() {
  if (isReadyToExchange || isReadyToExchangeForeign) {
    try {
      const user = tgObject.initDataUnsafe.user;
      const { id: userId, username: userName } = user;

      let claimData, response;

      if (isReadyToExchange) {
        const { currencyName: firstCurrencyName } =
          currencyExchangeData.sourceFinancial;
        const { currencyName: secondCurrencyName } =
          currencyExchangeData.targetFinancial;
        const firstAmount = document.getElementById("amount-input").value;
        const secondAmount = document.getElementById(
          "second-amount-input"
        ).value;

        claimData = {
          sourceFinancial: {
            financialName: firstCurrencyName,
            amount: firstAmount,
          },
          targetFinancial: {
            financialName: secondCurrencyName,
            amount: secondAmount,
          },
          user: { userName, tgUserId: userId },
        };

        response = await fetch(`${apiUrl}/exchange`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(claimData),
        });
      } else if (isReadyToExchangeForeign) {
        const { name: targetCurrencyName } =
          currencyExchangeData.sourceFinancial;
        const { name: sourceCurrencyName } =
          currencyExchangeData.targetFinancial;
        const sourceAmount = document.getElementById("amount-input").value;

        claimData = {
          sourceFinancial: {
            financialName: targetCurrencyName,
            amount: sourceAmount,
          },
          targetFinancialName: sourceCurrencyName,
          user: { userName, tgUserId: userId },
        };

        response = await fetch(`${apiUrl}/exchange/foreign`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(claimData),
        });
      }

      await handleResponse(response);
    } catch (err) {
      console.error("Ошибка при отправке данных:", err);
    }
  }
}

async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Ошибка сервера: ${response.status} - ${errorText}`);
    if (response.status === 403) {
      tgObject.showPopup(
        {
          title: "Ошибка",
          message: "Для формирования заявки запустите бота.",
        },
        () => {}
      );
    }
    return;
  }
  isReadyToExchangeForeign = false;
  isReadyToExchange = false;
  tgObject.showPopup(
    {
      title: "Успешно",
      message: "Ваша заявка успешно отправлена.\nОжидайте ответа в чате бота.",
    },
    () => {
      tgObject.openTelegramLink("https://t.me/amra_exchange_bot");
      tgObject.close();
    }
  );
}

async function openBot() {
  tgObject.openTelegramLink("https://t.me/amra_exchange_bot");
  tgObject.close();
}

tgObject.MainButton.onClick(makeClaim);
tgObject.SecondaryButton.onClick(openBot);
