import { test } from "../fixtures/testFixtures.js";
import { expect } from "@playwright/test";
import fs from "fs";
import { PDFParse } from "pdf-parse";

import { checkOutData } from "../test-data/checkOutData.js"
import { checkoutProducts } from "../test-data/productData.js"

test("Verify downloaded receipt PDF", async ({ page, OrderCompletionPage, generatePdfPage }) => {

    await page.pause();

    // 1. Capture UI values before downloading

    const subtotalText =
        await OrderCompletionPage.subTotal.textContent();

    const taxText =
        await OrderCompletionPage.taxLabel.textContent();

    const totalText =
        await OrderCompletionPage.totalLabel.textContent();


    // 2. Start listening for download

    const downloadPromise = page.waitForEvent("download");

    // 3. Click Download Receipt

    await generatePdfPage.downloadPdf();

    // 4. Get downloaded file

    const download = await downloadPromise;

    // 5. Save PDF

    const filePath = "downloads/order-receipt.pdf";

    await download.saveAs(filePath);

    //6. Verify file is PDF

    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    // 7. Read PDF

    const pdfBuffer = fs.readFileSync(filePath);

    const parser = new PDFParse({ data: pdfBuffer });

    const pdfData = await parser.getText();

    await parser.destroy();


    // 8. Verify receipt title

    expect(pdfData.text).toContain("Order Receipt");


    // 9. Verify customer name

    const customerName = `${checkOutData.valid.firstName} ${checkOutData.valid.lastName}`;

    expect(pdfData.text).toContain(customerName);


    // 10. Verify products and prices

    for (const product of checkoutProducts) {

        expect(pdfData.text)
            .toContain(product.name);

        expect(pdfData.text)
            .toContain(product.price);
    }


    // 11. Verify subtotal

    const subtotal = subtotalText.replace("Item total: $", "").trim();

    expect(pdfData.text).toContain(subtotal);


    // 12. Verify tax

    const tax = taxText.replace("Tax: $", "").trim();

    expect(pdfData.text).toContain(tax);


    // 13. Verify total

    const total = totalText.replace("Total: $", "").trim();

    expect(pdfData.text).toContain(total);
});