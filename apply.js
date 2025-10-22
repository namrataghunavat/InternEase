module.exports = async function apply(page, data) {
  await page.waitForSelector("#continue_button");
  await page.click("#continue_button");

  await page.waitForSelector("#form-container", { visible: true });

  await page.waitForSelector("#cover_letter_holder > div.ql-editor.ql-blank", {
    visible: true,
  });
  await page.type(
    "#cover_letter_holder > div.ql-editor.ql-blank",
    data["Hiring_Reason"]
  );

  await page.waitForSelector("#assessment_questions_container", {
    visible: true,
  });

  let ans = await page.$$(".textarea.form-control");

  for (let i = 0; i < ans.length; i++) {
    if (i == 0) {
      await ans[i].type(data["Hiring_Reason"]);
    } else if (i == 1) {
      await ans[i].type(data["availability"]);
    } else if (i == 2) {
      await ans[i].type(data["Project_Title"]);
    } else {
      await ans[i].type(data["rating"]);
    }

    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
    });
  }

  await page.click("#submit");
};
