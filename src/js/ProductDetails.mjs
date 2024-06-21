import { setLocalStorage } from "./utils.mjs";

function generateProductTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetailView {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.productData  = {};
    this.dataSource = dataSource;
  }
  async initialize() {
 
    this.productData = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");

    document.getElementById("addToCart")
    .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    setLocalStorage("so-cart", this.product);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      generateProductTemplate(this.productData)
    );
   }

}