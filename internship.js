module.exports = async function internship(page,data) {
  await page.waitForSelector("#experience_profile", { visible: true });
  await page.type("#experience_profile", data["Previous_Profile"]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#experience_organization", { visible: true });
  await page.type("#experience_organization", data["Organization"]);

  await page.waitForSelector("#experience_is_work_from_home_label", {
    visible: true,
  });
  await page.click("#experience_is_work_from_home_label");

  await page.waitForSelector("#experience_start_date", { visible: true });
  await page.click("#experience_start_date");

  const [day, month, year] = data["Start_Date"];
  const targetYear = year;
  const targetMonth = month;
  const targetDate = day;

  await page.waitForSelector("#ui-datepicker-div", { visible: true });

  // Select the year
  await page.select(".ui-datepicker-year", targetYear);

  // Select the month
  await page.select(
    ".ui-datepicker-month",
    new Date(targetMonth + " 1, 2000").getMonth().toString()
  );

  // Select the specific date
  let dates = await page.$$("#ui-datepicker-div > table > tbody > tr td a");
  for (const date of dates) {
    const dateText = await page.evaluate((el) => el.textContent.trim(), date);
    if (dateText === targetDate) {
      await date.click();
      break;
    }
  }

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#experience_on_going_label", { visible: true });
  await page.click("#experience_on_going_label");

  await page.waitForSelector("#experience_description", { visible: true });
  await page.type("#experience_description", data["Description_Internship"]);

  await page.click("#internship-job-submit");
};