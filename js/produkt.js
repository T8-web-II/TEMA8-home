const params = new URLSearchParams(window.location.search);
const id = params.get("id") ?? "13";
const produktContainer = document.querySelector(".produktgrid");

document.querySelector(".back-btn").addEventListener("click", goBack);
function goBack() {
  window.history.back();
}
let currentImageIndex = 0;
let images = [];

fetch(`https://dummyjson.com/products/${id}`)
  .then((res) => res.json())
  .then((data) => {
    images = data.images?.length ? data.images : [data.thumbnail];

    const discountBadge = data.discountPercentage
      ? `<div class="discount-badge">${Math.round(data.discountPercentage)}%</div>`
      : "";

    const originalPrice = data.price;
    const discountedPrice = Math.round(
      data.price * (1 - data.discountPercentage / 100),
    );

    const dots = images
      .map((_, i) => `<span class="dot ${i === 0 ? "active" : ""}"></span>`)
      .join("");

    produktContainer.innerHTML = `
      <div class="imagelayout">
        ${discountBadge}
        <button class="arrow-btn left" onclick="changeImage(-1)">&#8592;</button>
        <img id="main-image" src="${images[0]}" alt="${data.title}" />
        <button class="arrow-btn right" onclick="changeImage(1)">&#8594;</button>
        <div class="carousel-dots">${dots}</div>
      </div>

      <article>
        <h1>${data.title}</h1>
        <div class="price">
          <p class="discountoverlay">${originalPrice},-</p>
          <p class="discountedprice">NOW ${discountedPrice},-</p>
        </div>
        <p class="ratings">Ratings: ${data.rating}</p>
        <p>${data.description}</p>

        <div class="info-box">
          <p><strong>Warranty Information:</strong> ${data.warrantyInformation}</p>
          <p><strong>Shipping Information:</strong> ${data.shippingInformation}</p>
          <p><strong>Availability Status:</strong> ${data.availabilityStatus}</p>
        </div>

        <div class="product-meta">
          ${data.brand ? `<p><strong>Brand:</strong> "${data.brand}"</p>` : ""}
          <p><strong>Sku:</strong> "${data.sku}"</p>
          <p><strong>Weight:</strong> ${data.weight}kg</p>
          <p><strong>Dimensions:</strong> Width: ${data.dimensions.width}cm, Height: ${data.dimensions.height}cm, Depth: ${data.dimensions.depth}cm</p>
        </div>

        <div class="quantity-cart">
          <div class="quantity-selector">
            <button class="qty-btn" onclick="changeQty(-1)">-</button>
            <span class="qty-display" id="qty">1</span>
            <button class="qty-btn" onclick="changeQty(1)">+</button>
          </div>
          <button class="add-to-cart">Add to cart</button>
        </div>
      </article>
    `;
  });

function changeImage(direction) {
  currentImageIndex =
    (currentImageIndex + direction + images.length) % images.length;
  document.getElementById("main-image").src = images[currentImageIndex];
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentImageIndex);
  });
}

function changeQty(change) {
  const qtyEl = document.getElementById("qty");
  const newQty = Math.max(1, parseInt(qtyEl.textContent) + change);
  qtyEl.textContent = newQty;
}
