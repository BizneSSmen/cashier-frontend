function createCurrencyCard(data, hasChevron = false) {
  const card = document.createElement("div");
  card.className =
    "row border rounded-2 d-flex justify-content-between p-2 mb-2 first-currency";

  const logo = document.createElement("div");
  logo.className = "col-auto p-0 d-flex align-items-center";
  logo.innerHTML = `<img src="../../static/icons/${data.currencyName}.svg"></img>`;

  const financialData = document.createElement("div");
  financialData.className = "col text-start pe-0";
  financialData.innerHTML = `<p class="hint_color fs-12">${data.currencyName}</p>
                            <p class="text_color fs-17">${data.name}</p>`;

  card.appendChild(logo);
  card.appendChild(financialData);
  if (hasChevron) {
    const chevron = document.createElement("div");
    chevron.className = "col-auto p-0 d-flex align-items-end";
    chevron.innerHTML =
      "<i id='chevron-icon' class='bi bi-chevron-down text_color fw-600 d-flex'></i>";
    card.appendChild(chevron);
  }

  return card;
}

function toggleOffcanvas(enable) {
  const offcanvasLoader = document.getElementById("offcanvas-loader");
  const chevronIcon = document.getElementById("chevron-icon");
  if (!enable) {
    chevronIcon.classList.add("d-none");
    offcanvasLoader.setAttribute("data-bs-toggle", "#");
  } else {
    chevronIcon.classList.remove("d-none");
    offcanvasLoader.setAttribute("data-bs-toggle", "offcanvas");
  }
}
