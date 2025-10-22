module.exports = async function Project(page,data) {

  await page.waitForSelector("#other_experiences_title", { visible: true });
  await page.type("#other_experiences_title", data["Project_Title"]);

  await page.click("#other_experiences_project_start_date");
  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  const [day, month, year] = data["Start_Date"];
  const targetYear = year;
  const targetMonth = month;

  await page.waitForSelector("#ui-datepicker-div", { visible: true });

  // Select the year
  await page.select(".ui-datepicker-year", targetYear);

  // Select the month
  await page.select(
    ".ui-datepicker-month",
    new Date(targetMonth + " 1, 2000").getMonth().toString()
  );

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.click("#other_experiences_project_end_date");

  const [day1, month1, year1] = data["End_Date"];
  const targetYear1 = year1;
  const targetMonth1 = month1;

  await page.waitForSelector("#ui-datepicker-div", { visible: true });

  // Select the year
  await page.select(".ui-datepicker-year", targetYear1);

  // Select the month
  await page.select(
    ".ui-datepicker-month",
    new Date(targetMonth1 + " 1, 2000").getMonth().toString()
  );

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#other_experiences_project_description", {
    visible: true,
  });
  await page.type(
    "#other_experiences_project_description",
    data["Project_Description"]
  );

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#other_experiences_project_link", {
    visible: true,
  });
  await page.type("#other_experiences_project_link", data["Project_Link"]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.click("#project-submit");
};