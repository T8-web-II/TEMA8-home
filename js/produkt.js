const params = new URLSearchParams(window.location.search);
const id = params.get("id") ?? "48";
const produktImage = document.querySelector(".produktgrid");

document.querySelector(".back-btn").addEventListener("click", goBack);
function goBack() {
  window.history.back();
}
console.log("ID fra URL:", id);
fetch(`https://dummyjson.com/products/category/furniture`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    const soldOut = data.soldout == 1;
    const soldOutText = soldOut
      ? `<p class="soldOuttext color-me-white">SOLD OUT</p>`
      : "";
    const discountText =
      data.discount > 0 ? `<p class="color-me-red">${data.discount}%</p>` : "";
    const discountedPrice =
      data.discount > 0
        ? `<div class="discounted"><p>NOW DKK ${Math.round(data.price * (1 - data.discount / 100))},-</p></div>`
        : "";

    produktImage.innerHTML = `<div>
        <img
          src="https://cdn.dummyjson.com/product-images/kitchen-accessories/pan/thumbnail.webp"
          alt="produktbillede"
        />
      </div>
      <article>
        <h1>title</h1>
        <div class="price">
          <p>price</p>
          <p>price now</p>
        </div>
        <div>
          <p>ratings</p>
          <p>description</p>
        </div>
        <div>
            <p>weight</p>
            <p>dimensions</p>
        </div>
      <div><button>how many</button><button>Add to Cart</button>
    </div>
      </article>
      `;
  });
