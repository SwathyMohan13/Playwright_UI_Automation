import { test as base, expect } from "@playwright/test";
import { AddToCart } from "../Pages/addToCart.js";
import { checkOutData } from "../test-data/checkOutData.js";
import { CheckOut } from "../Pages/checkOut.js";
import { GeneratePdf } from "../Pages/generatePdf.js";
import { InventoryPage } from "../Pages/inventory.js";
import { LoginPage } from "../Pages/loginPage.js";
import { Order } from "../Pages/order.js";
import { Products } from "../Pages/products.js";
import { checkoutProducts } from "../test-data/productData.js";

export const test = base.extend({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    authenticatedPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await page.goto("/");

        await loginPage.loginApplication(
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_PASSWORD
        );

        await expect(page.locator(".inventory_list")).toBeVisible();

        await use(page);
    },

    inventoryPage: async ({ authenticatedPage }, use) => {
        await use(new InventoryPage(authenticatedPage));
    },

    productPage: async ({ authenticatedPage }, use) => {
        await use(new Products(authenticatedPage));
    },

    addToCartPage: async ({ authenticatedPage }, use) => {
        await use(new AddToCart(authenticatedPage));
    },

    checkoutReadyPage: async ({ page, addToCartPage }, use) => {

        const products = checkoutProducts.map(product => product.name);

        await addToCartPage.addToCart(products);

        await use(page);
    },

    checkOutDetailsPage: async ({ checkoutReadyPage }, use) => {
        const checkOut = new CheckOut(checkoutReadyPage);

        await checkOut.checkOut();

        await use(checkOut);
    },

    OrderCompletionReadyPage: async ({ page, checkOutDetailsPage }, use) => {

        await checkOutDetailsPage.enteringDetails(
            checkOutData.valid.firstName,
            checkOutData.valid.lastName,
            checkOutData.valid.zip
        );

        await checkOutDetailsPage.continue();

        await use(page);

    },

    OrderCompletionPage: async ({ OrderCompletionReadyPage }, use) => {
        await use(new Order(OrderCompletionReadyPage));
    },

    generatePdfPage: async ({ page, OrderCompletionPage }, use) => {
    await use(new GeneratePdf(page));
}

});