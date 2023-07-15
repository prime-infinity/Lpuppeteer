//real scrapping
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

    console.log("going to page");
    await page.goto(
      "https://twitter.com/i/flow/login?redirect_after_login=%2F"
    );
    console.log("in twitter page");

    console.log("waiting for input to show in dom");
    await page.waitForSelector('input[name="text"]');
    console.log("input visible");

    console.log("typing number in input box");
    await page.type('input[name="text"]', "08118450863");
    console.log("done typing");
  } catch (e) {
    console.log("scrapping failed:", e);
  } finally {
    await browser?.close();
    console.log("process done");
  }
}
run();
