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

document.getElementById("to-currencies").addEventListener("click", () => {
  isSecondCurrencySelected = false;
  currencyExchangeData = {};
  toggleSendButtons(false);
  toggleSwapButton(false);
  toggleSecondCurrencyTypeButtons(true);
  const firstCurrencyId = document
    .getElementById("first-currency-card")
    .getAttribute("financial-id");
  loadSecondCurrencies(firstCurrencyId);
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

      const response = await fetch("http://localhost:3000/exchange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(claimData),
      });

      // Проверка, если запрос не удался
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Ошибка сервера: ${response.status} - ${errorText}`);
        return;
      }

      const responseData = await response.json();
      console.log("Ответ от сервера:", responseData);
    } catch (err) {
      console.error("Ошибка при отправке данных:", err);
    }
  }
});
