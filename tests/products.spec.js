import { expect } from "@playwright/test";
import { test } from "../fixtures/testFixtures.js";
import { productData } from "../test-data/productData.js";


const products = Object.values(productData);

for (const product of products) {
    test(`Verify ${product.name} names` , async ({ productPage }) => {
        await productPage.openProducts(product.name);

        await expect(productPage.productDetailsName)
            .toHaveText(product.name);

        await expect(productPage.productDetailsPrice)
            .toHaveText(product.price);

        await expect(productPage.productDetailsDesc)
            .toHaveText(product.description);

        await expect(productPage.productDetailsCart).toBeVisible();
        await expect(productPage.productDetailsCart).toBeEnabled();

        await productPage.addToCart();
        await expect(productPage.removeButton).toBeVisible();
        await expect(productPage.removeButton).toBeEnabled();
        await expect(productPage.productDetailsBadge).toBeVisible();
        await productPage.removeFromCart();
        await expect(productPage.productDetailsBadge).not.toBeVisible();

        await productPage.backToProductsPage();
        await expect(productPage.page).toHaveURL(/inventory/);

    });
}
