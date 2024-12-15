let spot = document.getElementById("spot");

// Fetch products from the server
fetch("../products.php")
  .then((response) => response.json())
  .then((products) => {
    products.forEach((product) => {
      // Create card container
      const card = document.createElement("div");
      card.classList.add("card");

      // Create image element
      const img = document.createElement("img");
      img.src = product.img;
      card.appendChild(img);

      // Extract color from the image URL (if possible)
      let imgColor = null;
      const colorMatch = product.img.match(/\/([a-f0-9]{6})\//i);
      if (colorMatch) {
        imgColor = colorMatch[1];
      } else {
        imgColor = "000000"; // Default to black if no color found
      }
      const contrastingColor = getContrastingColor(`#${imgColor}`);

      // Add item code with contrasting color
      const icode = document.createElement("div");
      icode.classList.add("icode");
      icode.style.backgroundColor = `#${imgColor}`;
      icode.style.color = contrastingColor;
      icode.innerText = product.itemCode;
      card.appendChild(icode);

      // Add product details
      const details = document.createElement("div");
      details.classList.add("details");
      details.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.price}</p>
      `;
      card.appendChild(details);

      // Append card to spot
      spot.appendChild(card);
    });
  })
  .catch((error) => console.error("Error fetching products:", error));

// Utility to get contrasting color
function getContrastingColor(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#FFFFFF";
}
