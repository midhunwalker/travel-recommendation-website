function recommendCountry() {
  const country = document.getElementById("country").value;
  const result = document.getElementById("countryResult");

  if (country === "India") {
    result.innerHTML = `
      <h3>Taj Mahal</h3>
      <img src="images/india1.jpg">
      <img src="images/india2.jpg">
    `;
  } else if (country === "Japan") {
    result.innerHTML = `
      <h3>Mount Fuji</h3>
      <img src="images/japan1.jpg">
      <img src="images/japan2.jpg">
    `;
  } else {
    result.innerHTML = "<p>Please select a country.</p>";
  }
}
