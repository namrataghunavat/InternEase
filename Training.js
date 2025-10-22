module.exports = async function Training(page,data) {
  await page.waitForSelector("#other_experiences_course", { visible: true });
  await page.type("#other_experiences_course", data["Training"]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#other_experiences_organization", {
    visible: true,
  });
  await page.type("#other_experiences_organization", data["Organization"]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.click("#other_experiences_location_type_label");

  await page.click("#other_experiences_start_date");

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  const [day, month, year] = data["Start_Date"];
  const targetYear = year;
  const targetMonth = month; // Full month name (e.g., 'January', 'February', etc.)
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

  await page.waitForSelector("#other_experiences_end_date");
  await page.click("#other_experiences_end_date");

  const [day1, month1, year1] = data["End_Date"];
  const targetYear1 = year1;
  const targetMonth1 = month1; // Full month name (e.g., 'January', 'February', etc.)
  const targetDate1 = day1;

  await page.waitForSelector("#ui-datepicker-div", { visible: true });

  // Select the year
  await page.select(".ui-datepicker-year", targetYear1);

  // Select the month
  await page.select(
    ".ui-datepicker-month",
    new Date(targetMonth1 + " 1, 2000").getMonth().toString()
  );

  let dates1 = await page.$$("#ui-datepicker-div > table > tbody > tr td a");
  for (const date of dates1) {
    const dateText = await page.evaluate((el) => el.textContent.trim(), date);
    if (dateText === targetDate1) {
      await date.click();
      break;
    }
  }

  // await page.click("#other_experiences_is_on_going");

  await page.waitForSelector("#other_experiences_training_description", {
    visible: true,
  });
  await page.type(
    "#other_experiences_training_description",
    data["Description_Training"]
  );

  await page.click("#training-submit");
};
