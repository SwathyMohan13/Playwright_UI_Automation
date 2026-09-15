export class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator('#user-name')
        this.password = page.locator('#password')
        this.login = page.locator('#login-button')
        this.errorMsg = page.locator('[data-test="error"]');
    }

    async loginApplication(username, password) {
        await this.userName.fill(username)
        await this.password.fill(password)
        await this.login.click();
    }


}