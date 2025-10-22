module.exports = async function education(page,data) {
  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#college", { visible: true });
  await page.click("#college"); // Ensure the field is focused
  await page.evaluate(() => (document.querySelector("#college").value = "")); // Clear the field
  await page.type("#college", data["College"]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#start_year_chosen", { visible: true });
  await page.click("#start_year_chosen");
  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#start_year_chosen > a > span", {
    visible: true,
  });
  await page.click("#start_year_chosen > a > span");

  await page.waitForSelector("#start_year_chosen > a > div > b", {
    visible: true,
  });
  await page.click("#start_year_chosen > a > div > b");

  await page.waitForSelector("#start_year_chosen > div > ul > li", {
    visible: true,
  });

  let years = await page.$$("#start_year_chosen > div > ul > li");
  for (const year of years) {
    const yearText = await page.evaluate((el) => el.textContent.trim(), year);
    if (yearText === data["Start_Year"]) {
      await year.click();
      break;
    }
  }

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#end_year_chosen", { visible: true });
  await page.click("#end_year_chosen");

  await page.waitForSelector("#end_year_chosen > a > span", { visible: true });
  await page.click("#end_year_chosen > a > span");

  await page.waitForSelector("#end_year_chosen > a > div > b", {
    visible: true,
  });
  await page.click("#end_year_chosen > a > div > b");

  await page.waitForSelector("#end_year_chosen > div > ul > li", {
    visible: true,
  });
  let end_years = await page.$$("#end_year_chosen > div > ul > li");

  for (const year of end_years) {
    const end_yearText = await page.evaluate(
      (el) => el.textContent.trim(),
      year
    );
    if (end_yearText === data["End_Year"]) {
      await year.click();
      break;
    }
  }

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#degree", { visible: true });
  await page.type("#degree", data["Degree"]);

  await page.waitForSelector("#stream", { visible: true });
  await page.type("#stream", data["Stream"]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#performance-college", { visible: true });
  await page.type("#performance-college", data["Percentage"]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.click("#college-submit");

  await page.waitForSelector("#add-education-modal > div > div > button", {
    visible: true,
  });
  await page.evaluate(() => {
    document.querySelector("#add-education-modal > div > div > button").click();
  });
};