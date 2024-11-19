function toggleSendButtons(enable) {
  const sendButtonsContainer = document.getElementById(
    "send-buttons-container"
  );
  if (enable) {
    sendButtonsContainer.classList.remove("d-none");
  } else {
    sendButtonsContainer.classList.add("d-none");
  }
}

const backButton = document.getElementById("to-currencies");

backButton.addEventListener("click", () => {
  isSecondCurrencySelected = false;
  currencyExchangeData = {};
  toggleSendButtons(false);
  toggleSwapButton(false);
  toggleOffcanvas(true);
  toggleSecondCurrencyTypeButtons(true);
  const firstCurrencyId = document
    .getElementById("first-currency-card")
    .getAttribute("financial-id");
  loadSecondCurrencies(firstCurrencyId);
});

backButton.addEventListener("click", () => {
  setActiveButton(
    document.getElementById("second-currency-group-all"),
    currencyTypes,
    "second-currency-group-"
  );
});

document.getElementById("send-data").addEventListener("click", async () => {
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
        return;
      } else {
        isReadyToExchange = false;
        tgObject.close();
      }
    } catch (err) {
      console.error("Ошибка при отправке данных:", err);
    }
  }
});
