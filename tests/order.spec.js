import { expect } from "@playwright/test";
import { test } from "../fixtures/testFixtures.js";
import { checkoutProducts } from "../test-data/productData.js";


test.describe("Order Validation", () => {
test("Validating Overview Page of EComm", async ({ OrderCompletionPage }) => {

     await expect(OrderCompletionPage.cartItem).not.toHaveCount(0);
     await expect(OrderCompletionPage.pageTitle).toHaveText("Checkout: Overview");
     await expect(OrderCompletionPage.summaryInfo).not.toBeEmpty();

});

test("Validating Product Details", async ({ OrderCompletionPage }) => {

     await expect(OrderCompletionPage.itemName).toHaveText(checkoutProducts.map(product => product.name));
     await expect(OrderCompletionPage.itemPrice).toHaveText(checkoutProducts.map(product => product.price));
     await expect(OrderCompletionPage.itemDesc).toHaveText(checkoutProducts.map(product => product.description));

});

test("Verifying Summary Details", async ({ page, OrderCompletionPage }) => {

     await expect(OrderCompletionPage.paymentInfo).toContainText("SauceCard");
     await expect(OrderCompletionPage.shippingInfo).toHaveText("Free Pony Express Delivery!");

     const prices = await OrderCompletionPage.itemPrice.allTextContents();

     const calculatedSubtotal = prices.reduce((sum, price) => {
          return sum + Number(price.replace("$", ""));
     }, 0);

     const subtotalText = await OrderCompletionPage.subTotal.textContent();

     const subtotal = Number(subtotalText.replace("Item total: $", "").trim());

     expect(calculatedSubtotal).toBeCloseTo(subtotal, 2);

     const tax = await OrderCompletionPage.taxLabel.textContent();

     const taxTotal = Number(tax.replace("Tax: $", "").trim());

     const totalNumber = subtotal + taxTotal;

     const total = await OrderCompletionPage.totalLabel.textContent();

     const totalAmount = Number(total.replace("Total: $", "").trim());

     expect(totalNumber).toBeCloseTo(totalAmount, 2);

     await OrderCompletionPage.finish();

     await expect(OrderCompletionPage.pageTitle).toHaveText("Checkout: Complete!");
     await expect(OrderCompletionPage.successMsg).toHaveText("Thank you for your order!");
     await expect(OrderCompletionPage.successDesc).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
     await OrderCompletionPage.backHome();
     await expect(page).toHaveURL(/inventory/);


});
});