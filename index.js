import puppeteer from "puppeteer";
(async () => {
  //start

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://google.com");
  await browser.close();
  console.log("working");
})();
