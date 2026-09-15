export class AddToCart {
    constructor(page) {
        this.page = page;
        this.productCart = page.locator(".inventory_item");
        this.cartContainer = page.locator(".cart_item");
        this.cart = page.locator(".shopping_cart_link");
        this.badge = page.locator(".shopping_cart_badge");

        this.productDetailsName = page.locator('[data-test="inventory-item-name"]');
        this.productDetailsDesc = page.locator('[data-test="inventory-item-desc"]');
        this.productDetailsPrice = page.locator('[data-test="inventory-item-price"]');

        this.quantityLabel = page.locator('.cart_quantity_label');
        this.descLabel = page.locator(".cart_desc_label");
        this.quantityNo = page.locator('.cart_quantity');
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.checkoutButton = page.locator('#checkout');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }

    async addToCart(products) {
        for (const product of products) {
            const productLocator = this.productCart.filter({ hasText: product });
            await productLocator.getByRole("button", { name: "Add to cart" }).click();
        }

        await this.cart.click();
    }

    async removeProductsFromCart(...products) {

        for (const product of products) {

            const productLocator = this.cartContainer.filter({
                hasText: product
            });

            await productLocator
                .getByRole("button", { name: "Remove" })
                .click();
        }
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async checkOut() {
        await this.checkoutButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }


}