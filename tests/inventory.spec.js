import { expect } from "@playwright/test";
import { test } from "../fixtures/testFixtures.js";
import { inventoryData } from "../test-data/inventoryData.js";

test.describe("Inventory Page Validation", () => {

test("Inventory header Validation", async ({ inventoryPage }) => {

    await expect(inventoryPage.burgerIcon).toBeVisible();

    await expect(inventoryPage.burgerIcon).toBeEnabled();

    await expect(inventoryPage.appLogo).toBeVisible();

    await expect(inventoryPage.appLogo).toHaveText('Swag Labs');

    await expect(inventoryPage.shoppingCart).toBeVisible();

    await expect(inventoryPage.shoppingCart).toBeEnabled();

});

test("Verify every product has its details", async ({ inventoryPage }) => {

    const productCount = await inventoryPage.productCart.count();

    await expect(productCount).toBeGreaterThan(0);

    for (let i = 0; i < productCount; i++) {

        //product name
        await expect(inventoryPage.productNames.nth(i)).not.toBeEmpty();
        await expect(inventoryPage.productNames.nth(i)).toBeEnabled();

        //prices
        await expect(inventoryPage.productPrices.nth(i)).not.toBeEmpty();
        await expect(inventoryPage.productPrices.nth(i)).toHaveText(/^\$\d+\.\d{2}$/);

        //description
        await expect(inventoryPage.desc.nth(i)).not.toBeEmpty();

        //image
        await expect(inventoryPage.productImg.nth(i)).toBeVisible();
        await expect(inventoryPage.productImg.nth(i)).toBeEnabled();

        const productLocator = inventoryPage.productCart.nth(i);
        await expect(productLocator.getByRole("button", { name: "Add to cart" })).toBeEnabled();

    }

});

test("Sorting Items in ascending order(A to Z)", async ({ inventoryPage }) => {

    await inventoryPage.sortItems(inventoryData.dropdownOptions.ascSort);

    const products = await inventoryPage.productNames.allTextContents();
    const expectedProducts = [...products].sort();
    await expect(products).toStrictEqual(expectedProducts);

});

test("Sorting Items in descending order(Z to A)", async ({ inventoryPage }) => {

    await inventoryPage.sortItems(inventoryData.dropdownOptions.desc);

    const products = await inventoryPage.productNames.allTextContents();

    const expectedProducts = [...products].sort().reverse();

    await expect(products).toStrictEqual(expectedProducts);

});

test("Sorting Items in low to high", async ({ inventoryPage }) => {

    await inventoryPage.sortItems(inventoryData.dropdownOptions.lowToHigh);

    const prices = await inventoryPage.productPrices.allTextContents();

    const expectedPrices = [...prices].sort(
        (a, b) =>
            parseFloat(a.replace("$", "")) -
            parseFloat(b.replace("$", ""))
    );

    await expect(prices).toStrictEqual(expectedPrices);

});

test("Sorting Items in high to low", async ({ inventoryPage }) => {

    await inventoryPage.sortItems(inventoryData.dropdownOptions.highToLow);

    const prices = await inventoryPage.productPrices.allTextContents();

    const expectedPrices = [...prices].sort(
        (a, b) =>
            parseFloat(b.replace("$", "")) -
            parseFloat(a.replace("$", ""))
    );
    await expect(prices).toStrictEqual(expectedPrices);

});

});
