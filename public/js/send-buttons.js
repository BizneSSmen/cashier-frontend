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
  if (isReadyToExchange) {
    try {
      const { currencyName: firstCurrencyName } =
        currencyExchangeData.sourceFinancial;
      const { currencyName: secondCurrencyName } =
        currencyExchangeData.targetFinancial;
      const { value: firstAmount } = document.getElementById("amount-input");
      const { value: secondAmount } = document.getElementById(
        "second-amount-input"
      );
      const { id: userId, username: userName } = tgObject.initDataUnsafe.user;

      const claimData = {
        sourceFinancial: {
          financialName: firstCurrencyName,
          amount: firstAmount,
        },
        targetFinancial: {
          financialName: secondCurrencyName,
          amount: secondAmount,
        },
        user: { userName: userName, tgUserId: userId },
      };

      const response = await fetch(`${apiUrl}/exchange`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(claimData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Ошибка сервера: ${response.status} - ${errorText}`);
        if (response.status == 403) {
          tgObject.showPopup(
            {
              title: "Ошибка",
              message: "Для формирования заявки запустите бота.",
            },
            () => {}
          );
        }
        return;
      } else {
        isReadyToExchange = false;
        tgObject.showPopup(
          {
            title: "Успешно",
            message:
              "Ваша заявка успешно отправлена.\nОжидайте ответа в чате бота.",
          },
          () => {
            tgObject.openTelegramLink("https://t.me/amra_exchange_bot");
            tgObject.close();
          }
        );
      }
    } catch (err) {
      console.error("Ошибка пи отправке данных:", err);
    }
  }
}

async function openBot() {
  tgObject.openTelegramLink("https://t.me/amra_exchange_bot");
  tgObject.close();
}

tgObject.MainButton.onClick(makeClaim);
tgObject.SecondaryButton.onClick(openBot);
