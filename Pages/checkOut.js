export class CheckOut {
    constructor(page) {
        this.page = page;
        this.checkOutButton = page.locator('#checkout');
        this.title = page.locator('.title');
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.zip = page.locator('#postal-code');
        this.errorMsg = page.locator('[data-test="error"]');
        this.continueButton = page.locator("#continue");
        this.cancelButton = page.locator("#cancel");
    }

    async checkOut() {
        await this.checkOutButton.click();
    }

    async enteringDetails(firstname, lastname, zip) {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.zip.fill(zip);

    }

    async continue() {
        await this.continueButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }
}