(async () => {
  const response = await fetch(`${apiUrl}/ranges/minimum`);
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  const data = await response.json();
  minimum = parseInt(data);
})();
