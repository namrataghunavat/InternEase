module.exports = async function work_sample(page,data) {
  await page.waitForSelector("#github_profile", { visible: true });
  await page.click("#github_profile", data["Work_Link"]);

  await page.waitForSelector("#work-samples-submit", { visible: true });
  await page.click("#work-samples-submit");
};



