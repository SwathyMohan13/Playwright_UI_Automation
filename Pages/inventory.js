import { expect } from '@playwright/test'

export class InventoryPage {
    constructor(page) {
        this.burgerIcon = page.locator('#react-burger-menu-btn');
        this.appLogo = page.locator('.app_logo');
        this.shoppingCart = page.locator('#shopping_cart_container');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.title = page.locator('.title');
        this.sortOption = page.locator('.product_sort_container');
        this.productCart = page.locator(".inventory_item");
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator(".inventory_item_price");
        this.productImg = page.locator('.inventory_item_img');
        this.desc = page.locator('.inventory_item_desc');
        this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
    }

    async sortItems(option) {
        await expect(this.title).toHaveText('Products');
        await this.sortOption.click();
        await this.sortOption.selectOption(option);

    }
}