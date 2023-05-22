import puppeteer from "puppeteer";
(async () => {
  //start

  const browser = await puppeteer.launch({
    headless: false,
    //slowMo:100
  });
  const page = await browser.newPage();
  await page.goto("https://google.com");

  //const title = await page.title();
  //console.log("title", title);

  //const h1 = await page.$eval('h1', el => el.textContent)
  //const dataPoints = await page.$$('.class-one.class-two.class-three')

  /*for (let i = 0; i < array.length; i++) {
      const inside = array[i];
      console.log('inside element', await inside.$eval('span',el => el.textContent));
  }*/

  //await page.click('[href="https://google.com/signin"]')

  //await page.waitForNavigation()

  //await page.waitForSelector('.class-to-wait-for')

  //another way of clicking
  /*const element = await page.$('.class-to-click')
  await page.evaluate(element, element.click(), element)*/

  /*await page.type("#APjFqb", "string to type");
  await page.waitForTimeout(1000);*/

  await browser.close();
  console.log("working");
})();
