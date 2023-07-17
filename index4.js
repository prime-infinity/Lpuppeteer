import puppeteer from "puppeteer";
(async () => {
  //start

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  let stringName = "@infinity_prime";
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(2 * 60 * 1000);

  console.log("going to page");
  await page.goto("https://twitter.com/i/flow/login?redirect_after_login=%2F");
  console.log("in twitter page");

  console.log("waiting for input to show in dom");
  await page.waitForSelector('input[name="text"]');
  console.log("input visible");

  console.log("typing number in input box");
  await page.type('input[name="text"]', "08118450863");
  console.log("done typing");

  //click next button
  //possible point of error
  console.log("looking for next button to show");
  await page.waitForXPath(
    '//span[contains(text(), "Next")]/ancestor::div[@role="button"]'
  );
  const [nextButton] = await page.$x(
    '//span[contains(text(), "Next")]/ancestor::div[@role="button"]'
  );
  console.log("seen next button, clicking");
  await nextButton.click();
  console.log("clicked next button");

  //password element should appear
  console.log("wait for password element");
  await page.waitForSelector('input[name="password"]');
  console.log("found password element");

  console.log("type password");
  await page.type('input[name="password"]', "Un:YTVv96Cz(,T/");
  console.log("done typing password");

  //now to click on "login"
  console.log("waiting for login button");
  await page.waitForSelector('div[data-testid="LoginForm_Login_Button"]');
  console.log("clicking login button");
  await page.click('div[data-testid="LoginForm_Login_Button"]');
  console.log("clicked login button");

  //login successfull
  console.log("looking for search box");
  await page.waitForSelector('input[data-testid="SearchBox_Search_Input"]');
  const searchInput = await page.$(
    'input[data-testid="SearchBox_Search_Input"]'
  );
  console.log("typing in search box");
  await searchInput.type(stringName);
  await page.keyboard.press("Enter");
  console.log("Pressed enter, searchign");

  //click on the "people" tag
  console.log("searching for the people div");
  const divSelector = 'div[role="presentation"] a[href*="f=user"]';
  await page.waitForSelector(divSelector);
  console.log("seen the people div");
  await page.click(divSelector);
  console.log("clicked the people div");

  //check for the username after clicking the people tab
  console.log("looking for stringname link to click");
  const userCellSelector = `div[role="button"][data-testid="UserCell"]`;

  await page.waitForSelector(`${userCellSelector} span[role="link"]`);
  const userCells = await page.$$(userCellSelector);

  console.log("seen link name");
  console.log("clicking on link name");
  for (const userCell of userCells) {
    const userNameElement = await userCell.$('span[role="link"]');
    const userName = await page.evaluate(
      (element) => element.textContent,
      userNameElement
    );

    if (userName === stringName) {
      await userCell.click();
      break;
    }
  }

  //await browser.close();
  console.log("working");
})();
