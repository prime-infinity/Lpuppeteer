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
  await page.goto(`https://twitter.com/${stringName}`);
  console.log(`Navigating to Twitter profile: ${stringName}`);

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
  console.log("login successfull, in profile");

  //trying to scrape from network response

  await page.setRequestInterception(true);

  page.on("request", (request) => {
    const resourceType = request.resourceType();
    console.log("Request - Resource type:", resourceType);

    if (resourceType === "xhr" || resourceType === "fetch") {
      console.log("Request - URL:", request.url());
      console.log("Request - Method:", request.method());
    }

    request.continue();
  });

  page.on("response", (response) => {
    const resourceType = response.request().resourceType();
    console.log("Response - Resource type:", resourceType);

    if (resourceType === "xhr" || resourceType === "fetch") {
      console.log("Response - URL:", response.url());
      console.log("Response - Status:", response.status());
    }
  });

  // Wait for the network response containing user data
  /*await page.waitForResponse((response) =>
    response.url().includes("/graphql/xc8f1g7BYqr6VTzTbvNlGw/UserByScreenName")
  );*/

  /*await page.waitForResponse((response) => {
    const request = response.request();
    console.log("request type:", request);
    const resourceType = request.resourceType();
    console.log("resource type:", resourceType);
    return (
      (resourceType === "xhr" || resourceType === "fetch") &&
      response
        .url()
        .includes("/graphql/xc8f1g7BYqr6VTzTbvNlGw/UserByScreenName") &&
      request.method() === "GET"
    );
  });*/

  console.log("waiting for the network response");
  // Get the network response
  /*const responses = await page.waitForResponse(
    (response) => {
      const url = response.url();
      const method = response.request().method();
      console.log("Checking response:", url, method);

      const isMatchingUrl = url.includes(
        "/graphql/xc8f1g7BYqr6VTzTbvNlGw/UserByScreenName"
      );
      const isPostMethod = method === "GET";

      console.log("Is matching URL:", isMatchingUrl);
      console.log("Is POST method:", isPostMethod);

      return isMatchingUrl && isPostMethod;
    },
    { timeout: 300000 }
  );*/

  console.log("Network response received.");
  //const responseJson = await responses.json();

  // Extract the follower count from the response
  /*const followersCount =
    responseJson?.data?.user?.result?.legacy?.followers_count || 0;

  console.log("Followers count: ", followersCount);
  console.log(responseJson);*/
  //await browser.close();
  console.log("working");
})();
