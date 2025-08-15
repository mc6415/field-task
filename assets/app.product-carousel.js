customElements.get("product-carousel") || customElements.define("product-carousel", class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    console.log("ProductCarousel connected");
  }
});