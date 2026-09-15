export class GeneratePdf{
    constructor(page){
        this.page = page;
        this.generatePdfButton = page.locator('[data-test="generate-pdf-order"]');
        this.finishButton = page.locator('[data-test="finish"]');

    }

    async downloadPdf(){
        await this.finishButton.click();
        await this.generatePdfButton.click();
    }
}