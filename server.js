const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const getStudentData = require("./personal_info");
const preferences = require("./preferences.js");
const internship = require("./internship.js");
const applications_internships = require("./applications_internships.js");
const apply = require("./apply.js");
const Additional_Info = require("./Additional_Info.js");
const work_sample = require("./work_sample.js");
const Project = require("./Project.js");
const Training = require("./Training.js");
const Position_Of_Responsibility = require("./Position_Of_Responsibility.js");
const education = require("./education.js");
const bodyParser = require("body-parser");

var page;

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

app.post("/apply", async (req, res) => {
  const { email_id, password } = req.body;

  console.log(email_id);
  const studentData = getStudentData();

  async function loadPage() {
    let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
      args: ["--start-maximized"],
    });

    let tab = await browser.pages();
    page = tab[0];

    await page.goto("https://internshala.com/");

    await page.click(
      "#header > div > nav > div.nav-cta-container > button.login-cta"
    );

    await page.type("#modal_email", email_id, { delay: 1 });
    await page.type("#modal_password", password, {
      delay: 100,
    });
    // console.log("sex");
    await page.click("#modal_login_submit");
    //   console.log("sex");

    await page.waitForNavigation({ waitUntil: "networkidle2" });

    await page.click(
      "#header > div > nav > div.collapse.navbar-collapse.navbar_desktop > ul > li.nav-item.dropdown.dropdown-hover.profile_container_hover > a"
    );

    await page.click(
      "#profile-dropdown > div > div > div > ul > div > li:nth-child(4) > a"
    );

    await page.waitForSelector("#education", { visible: true });
    await page.click("#education");

    await page.waitForSelector("#graduation-tab", { visible: true });
    await page.click("#graduation-tab");
    //   console.log("sex");

    await education(page, studentData[0]);
    //   console.log("sex");

    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
    });

    // await page.waitForSelector("#internship", { visible: true });
    // await page.click("#internship");

    // await internship(page, studentData[0]);
    //   console.log("sex");

    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
    });

    await page.waitForSelector("#por-resume", { visible: true });
    await page.click("#por-resume");

    await Position_Of_Responsibility(page, studentData[0]);
    //   console.log("sex");
    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
    });

    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
    });

    await page.waitForSelector("#training-resume", { visible: true });
    await page.click("#training-resume");

    await Training(page, studentData[0]);
      console.log("sex");
    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
    });

    await page.waitForSelector("#project-resume", { visible: true });
    await page.click("#project-resume");

    await Project(page, studentData[0]);
    //   console.log("sex");

    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
    });

    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
    });

    await page.waitForSelector("#additional-form-modal", { visible: true });
    await page.click("#additional-form-modal");

    await Additional_Info(page, studentData[0]);
    //   console.log("sex");

    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
    });

    await page.goto(
      "https://internshala.com/user_preference/preferences?referral=search"
    );
    await preferences(page, studentData[0]);
    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
    });
    //   console.log("sex");

    await applications_internships(page, studentData[0]);
    //   console.log("sex");

    await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
    });

    await page.close();
  }

  loadPage().catch(console.error);
  res.send("Script started");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
