import { expect } from "@playwright/test";
import { test } from "../fixtures/testFixtures.js";
import { productData } from "../test-data/productData.js";
import { checkoutProducts } from "../test-data/productData.js";


test.describe("Add to Cart Page Validation", () => {
test("Checkout Button should be disabled when the cart is empty", async ({ addToCartPage }) => {

    const itemName = productData.fleeceJacket;
    const product = [itemName.name];

    await addToCartPage.addToCart(product);

    await expect(addToCartPage.quantityLabel).toBeVisible();
    await expect(addToCartPage.descLabel).toBeVisible();
    await expect(addToCartPage.quantityNo).toHaveText("1");

    await expect(addToCartPage.productDetailsName).toHaveText(itemName.name);
    await expect(addToCartPage.productDetailsPrice).toHaveText(itemName.price);
    await expect(addToCartPage.productDetailsDesc).toHaveText(itemName.description);

    await addToCartPage.removeProductsFromCart(product);
    await expect(addToCartPage.badge).not.toBeVisible();
    await expect(addToCartPage.cartContainer).not.toBeVisible();

    await expect(addToCartPage.checkoutButton).toBeDisabled();


});

test("Validating multiple product addition to cart", async ({ page, addToCartPage }) => {

    const products = checkoutProducts.map(product => product.name);

    await addToCartPage.addToCart(products);
    await expect(addToCartPage.badge).toBeVisible();

    await addToCartPage.removeProductsFromCart(products[0], products[1]);
    await expect(addToCartPage.cartContainer).toContainText(products[2]);
    await expect(addToCartPage.badge).toBeVisible();

    await expect(addToCartPage.checkoutButton).toBeEnabled();
    await addToCartPage.checkOut();
    await expect(page).toHaveURL(/checkout-step-one/);

    await addToCartPage.cancel();
    await addToCartPage.continueShopping();
    await expect(page).toHaveURL(/inventory/);
});

});