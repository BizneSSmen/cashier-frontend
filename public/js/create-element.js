function createElement(tag, className, innerHTML = "", textContent = "") {
  const element = document.createElement(tag);
  element.className = className;
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  if (textContent) {
    element.textContent = textContent;
  }
  return element;
}
