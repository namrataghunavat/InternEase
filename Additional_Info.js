module.exports = async function Additional_Info(page,data) {
  await page.waitForSelector("#additional_detail_description", {
    visible: true,
  });
  await page.type("#additional_detail_description", data["Additional_Info"]);

  await page.waitForSelector("#additional-detail-submit", { visible: true });
  await page.click("#additional-detail-submit");
};


