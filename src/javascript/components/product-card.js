export default(() => {
    if(!customElements.get('product-card')) {
        customElements.define('product-card', class ProductCard extends HTMLElement {
            constructor() {
                super();
            }

            connectedCallback() {
                console.log('ProductCard connected');

                this.selectors = {
                    variantSelector: "[data-product-card='variant-selector']",
                    productCard: "[data-product-card='product-card']",
                    variantSelectorOption: "[data-product-card='variant-selector-option']",
                }

                this.elements = Object.keys(this.selectors).reduce((acc, key) => {
                    acc[key] = this.querySelectorAll(this.selectors[key]);

                    if(acc[key].length === 1) {
                        acc[key] = acc[key][0];
                    }

                    return acc;
                }, {});

                console.log(this.elements)

                this.setupListeners();
            }

            setupListeners() {
                this.elements.productCard.addEventListener('mouseenter', () => {
                    this.elements.variantSelector.setAttribute('aria-hidden', 'false');
                });

                this.elements.productCard.addEventListener('mouseleave', () => {
                    this.elements.variantSelector.setAttribute('aria-hidden', 'true');
                });

                this.elements.variantSelectorOption.forEach(option => {
                    option.addEventListener('click', () => {
                        const variantId = option.dataset.variantId;

                        console.log(variantId);

                        let formData = {
                            'items': [{
                                id: variantId,
                                quantity: 1,
                            }],
                        };

                        fetch(window.Shopify.routes.root + 'cart/add.js', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formData),
                        })
                        .then(response => {
                            return response.json();
                        })
                        .catch(error => {
                            console.error(error)
                        })
                    });
                });
            }
        })
    }
})();