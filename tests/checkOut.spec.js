import { expect } from "@playwright/test";
import { test } from "../fixtures/testFixtures.js";
import { checkOutData } from "../test-data/checkOutData.js";
import { invalidCheckOutData } from "../test-data/checkOutData.js";


test.describe("Checkout Page Validation", () => {
test("Validating Customer Details with credentials", async ({ page, checkOutDetailsPage }) => {

   await expect(checkOutDetailsPage.title).toHaveText("Checkout: Your Information");
   await checkOutDetailsPage.enteringDetails(
      checkOutData.valid.firstName,
      checkOutData.valid.lastName,
      checkOutData.valid.zip

   );
   await checkOutDetailsPage.continue();
   await expect(page).toHaveURL(/checkout-step-two/);

});

for (const data of invalidCheckOutData) {

   test(`Checkout - ${data.scenario}`, async ({ checkOutDetailsPage }) => {

      await checkOutDetailsPage.enteringDetails(
         data.firstName,
         data.lastName,
         data.zip
      );

      await checkOutDetailsPage.continue();

      await expect(checkOutDetailsPage.errorMsg)
         .toHaveText(data.errorMessage);
   });
}
});