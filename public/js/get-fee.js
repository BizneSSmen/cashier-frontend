(async () => {
  const response = await fetch(`${apiUrl}/ranges/`);
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  const data = await response.json();
  fees = data;
})();

function getFee(amount) {
  const filtered = fees.filter(
    (fee) => fee.min <= amount && (fee.max === null || fee.max > amount)
  );

  if (filtered.length > 0) {
    return filtered[0].fee;
  } else {
    return 0;
  }
}
