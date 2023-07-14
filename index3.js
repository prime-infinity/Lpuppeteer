//template
import puppeteer from "puppeteer-core";

const auth = "brd-customer-hl_bd3d661c-zone-scraping_browserrr:b97era99nx6d";

async function run() {
  let browser;
  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`,
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto("http://lumtest.com/myip.json");
    // Extract the text within the <body></body> tag
    const text = await page.$eval("body", (element) => element.textContent);
    console.log(text.trim()); // Output the extracted text
  } catch (e) {
    console.log("scrapping failed:", e);
  } finally {
    await browser?.close();
    console.log("process done");
  }
}
run();
