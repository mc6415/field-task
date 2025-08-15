export default(() => {
    if(!customElements.get('product-carousel')) {
        customElements.define('product-carousel', class ProductCarousel extends HTMLElement {
            constructor() {
                super();
            }

            connectedCallback() {
                console.log('ProductCarousel connected');
            }
        })
    }
})();