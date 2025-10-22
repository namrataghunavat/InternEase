const apply = require("./apply.js");

module.exports = async function applications_internships(
  page,
  data,
  iterations = 0
) {
  const MAX_ITERATIONS = 3;
  if (iterations >= MAX_ITERATIONS) {
    return;
  }
  await page.goto("https://internshala.com/internships/matching-preferences/");

  await page.waitForSelector("#internship_list_container_1", {
    visible: true,
  });

  const internships = await page.$$(
    "#internship_list_container_1 .individual_internship"
  );

  for (const internship of internships) {
    await internship.click();

    try {
      await internship.asElement().click();
      await apply(page, data);
      await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
      });
      await applications_internships(page, data, iterations + 1);
      return;
    } catch (error) {
      console.error("Error clicking internship:", error);
    }
  }
};
