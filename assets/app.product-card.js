customElements.get("product-card") || customElements.define("product-card", class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    console.log("ProductCard connected"), this.selectors = {
      variantSelector: "[data-product-card='variant-selector']",
      productCard: "[data-product-card='product-card']",
      variantSelectorOption: "[data-product-card='variant-selector-option']"
    }, this.elements = Object.keys(this.selectors).reduce((e, t) => (e[t] = this.querySelectorAll(this.selectors[t]), 
    1 === e[t].length && (e[t] = e[t][0]), e), {}), console.log(this.elements), this.setupListeners();
  }
  setupListeners() {
    this.elements.productCard.addEventListener("mouseenter", () => {
      this.elements.variantSelector.setAttribute("aria-hidden", "false");
    }), this.elements.productCard.addEventListener("mouseleave", () => {
      this.elements.variantSelector.setAttribute("aria-hidden", "true");
    }), this.elements.variantSelectorOption.forEach(e => {
      e.addEventListener("click", () => {
        const t = e.dataset.variantId;
        console.log(t);
        let r = {
          items: [ {
            id: t,
            quantity: 1
          } ]
        };
        fetch(window.Shopify.routes.root + "cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(r)
        }).then(e => e.json()).catch(e => {
          console.error(e);
        });
      });
    });
  }
});