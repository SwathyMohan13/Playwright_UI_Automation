export class Order {
    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator(".title");
        this.cartList = page.locator(".cart_list");
        this.cartItem = page.locator(".cart_item");
        this.summaryInfo = page.locator(".summary_info");
        this.itemName = page.locator(".inventory_item_name");
        this.itemPrice = page.locator(".inventory_item_price");
        this.itemDesc = page.locator(".inventory_item_desc");
        this.cartQuantity = page.locator(".cart_quantity");

        this.paymentInfo = page.locator('[data-test="payment-info-value"]');
        this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
        this.subTotal = page.locator(".summary_subtotal_label");
        this.taxLabel = page.locator(".summary_tax_label");
        this.totalLabel = page.locator(".summary_total_label");

        this.cancelButton = page.locator("#cancel");
        this.finishButton = page.locator("#finish");

        this.successMsg = page.locator('[data-test="complete-header"]');
        this.successDesc = page.locator('[data-test="complete-text"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async cancel() {
        await this.cancelButton.click();
    }

    async finish() {
        await this.finishButton.click();

    }

    async backHome() {
        await this.backHomeButton.click();
    }

}