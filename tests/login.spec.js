import { expect } from "@playwright/test";
import { test } from "../fixtures/testFixtures.js";
import { invalidLoginData } from "../test-data/invalidLoginData.js";

test.describe("Login Validation", () => {

test("Login Validation", async ({ page, loginPage }) => {

    await page.goto('/');
    await loginPage.loginApplication(
        process.env.SAUCE_USERNAME,
        process.env.SAUCE_PASSWORD);

    await expect(page).toHaveURL(/inventory/);

});


for (const data of invalidLoginData) {

    test(`Login Validation - ${data.scenario}`, async ({ page, loginPage }) => {

        await page.goto("/");

        await loginPage.loginApplication(
            data.username,
            data.password
        );

        await expect(loginPage.errorMsg).toHaveText(data.expectedError);
    });
}
});