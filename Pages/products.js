export class Products {

    constructor(page) {
        this.page = page;
        this.productCart = page.locator(".inventory_item");
        this.productDetailsName = page.locator('[data-test="inventory-item-name"]');
        this.productDetailsDesc = page.locator('[data-test="inventory-item-desc"]');
        this.productDetailsPrice = page.locator('[data-test="inventory-item-price"]');
        this.productDetailsCart = page.locator("#add-to-cart");
        this.removeButton = page.locator("#remove");
        this.productDetailsBadge = page.locator(".shopping_cart_badge");
        this.backButton = page.locator("#back-to-products");
    }

    async openProducts(productName) {
        const product = this.productCart.filter({
            hasText: productName
        });

        await product.locator(".inventory_item_name").click();

        await this.page.waitForURL(/inventory-item\.html/);
    }


    async addToCart() {
        await this.productDetailsCart.click();
    }

    async removeFromCart() {
        await this.removeButton.click();
    }

    async backToProductsPage() {
        await this.backButton.click();
    }

}