// Få fat i kategorien fra URL'en
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// fetch produkter baseret på den valgte kategori og opdater siden
fetch(`https://dummyjson.com/products/category/${category}`)
  .then((response) => response.json())
  .then((data) => {
    // opdater sidens "titel" baseret på kategorienS
    const heading = document.querySelector(".categories > h1");
    const formatted = category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    heading.textContent = formatted;

    const products = data.products;
    const container = document.getElementById("product-container");

    // Find det billigste produkt
    const cheapest = products.reduce((lowest, current) => {
      return current.price < lowest.price ? current : lowest;
    });

    // Lav et "promo-kort" til det billigste produkt og placer det først
    const promoCard = document.createElement("div");
    promoCard.className = "produkt-kort promo-kort";
    promoCard.innerHTML = `
      <a href="produkt.html?id=${cheapest.id}" class="promo-link">
        <img class="produkt-billede" src="${cheapest.images[0]}" />
        
          <span class="badge billigst">Billigst</span>
          <p class="promo-pris">${cheapest.price} kr.</p>
        
      </a>
    `;
    container.appendChild(promoCard);

    // Lav kort til resten af produkterne
    products.forEach((product) => {
      if (product.id === cheapest.id) return;

      const card = document.createElement("div");
      card.className = "produkt-kort";

      let badgeHTML = "";
      let priceHTML = "";

      // Håndtering af rabat - original pris, nedsat pris og % badge
      if (product.discountPercentage > 0) {
        const discountedPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
        badgeHTML = `<span class="badge nedsat">-${Math.round(product.discountPercentage)}%</span>`;
        priceHTML = `
        <span class="pris-original">${product.price} kr.</span>
          <span class="pris-nedsat">${discountedPrice} kr.</span>
        `;
      } else {
        priceHTML = `<span class="pris-normal">${product.price} kr.</span>`;
      }

      // grundlæggende HTML for "const card" (OBS. Bliver også brugt til promo-kort!)
      card.innerHTML = `
        <a href="produkt.html?id=${product.id}">
          <img class="produkt-billede" src="${product.thumbnail}" />
          ${badgeHTML}
          <div class="produkt-info">
            
            <p class="produkt-navn">${product.title}</p>
          </div>
          <div class="produkt-pris">
            ${priceHTML}
          </div>
        </a>
      `;

      container.appendChild(card);
    });
  });
