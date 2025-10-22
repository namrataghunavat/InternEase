module.exports = async function Position_Of_Responsibility(page,data) {
  await page.waitForSelector("#other_experiences_por_description", {
    visible: true,
  });

  await page.evaluate((text) => {
    document.querySelector("#other_experiences_por_description").value = text;
  }, data["Position_Of_Responsibility"]);

  await page.waitForSelector("#por-submit", { visible: true });
  await page.click("#por-submit");
};