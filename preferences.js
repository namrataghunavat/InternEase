// preferences.js
module.exports = async function preferences(page, data) {
  await page.waitForSelector(
    "#user-preference-form > div.form-fields-container > div.form-field.input-field.multi-select-chip-field.categories-field > div.multiselect-input-chip-container > div.input-container.with-search > input[type=text]",
    { visible: true }
  );
  await page.click(
    "#user-preference-form > div.form-fields-container > div.form-field.input-field.multi-select-chip-field.categories-field > div.multiselect-input-chip-container > div.input-container.with-search > input[type=text]"
  );

  const array = data["Preferences"];
  for (const it of array) {
    await page.waitForSelector("#current_city", { visible: true });
    await page.type("#current_city", it);
    const categoriesSelector =
      "#categories-modal > div > div > div > div.form-field.dropdown-field.multi-select-chip-field.input-field.categories-field > div > div.dropdown-container > div.dropdown";

    try {
      await page.waitForSelector(categoriesSelector, {
        visible: true,
        timeout: 5000,
      });

      await page.click(categoriesSelector);
    } catch (error) {
      console.log(
        `Selector ${categoriesSelector} did not appear, continuing to next item.`
      );
      continue;
    }
  }

  await page.waitForSelector("#categories-modal > div > div > div > button", {
    visible: true,
  });
  await page.click("#categories-modal > div > div > div > button");

  await page.waitForSelector("#user-preference-form > button", {
    visible: true,
  });
  await page.click("#user-preference-form > button");
};
