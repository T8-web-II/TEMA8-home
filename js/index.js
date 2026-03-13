const categoryContainer = document.querySelector(".container_categories");
const productContainer = document.querySelector(".product-container");

const categories = ["furniture", "home-decoration", "kitchen-accessories"];

categories.forEach((category) => {
  const link = document.createElement("a");
  link.href = "#";
  link.textContent = category.replace("-", " ");

  link.addEventListener("click", () => loadProducts(category));

  categoryContainer.appendChild(link);
});

function loadProducts(category) {
  productContainer.innerHTML = "<p>Loader...</p>";

  fetch(`https://dummyjson.com/products/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      productContainer.innerHTML = "";

      data.products.forEach((product) => {
        productContainer.innerHTML += `
          <div class="product">
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.price} kr.</p>
          </div>
        `;
      });
    });
}

loadProducts(categories[0]);
