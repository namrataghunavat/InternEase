async function applyInternshala() {

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
let { email_id, password } = require("./Crediantials.js");

var page;

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
  await page.click("#modal_login_submit");

  await page.waitForNavigation({ waitUntil: "networkidle2" });

  await page.click(
    "#header > div > nav > div.collapse.navbar-collapse.navbar_desktop > ul > li.nav-item.dropdown.dropdown-hover.profile_container_hover > a"
  );
  await page.waitForSelector(
    "#profile-dropdown > div > div > div > ul > div > li:nth-child(5) > a",
    { visible: true }
  );

  await page.click(
    "#profile-dropdown > div > div > div > ul > div > li:nth-child(5) > a"
  );

  await preferences(page, studentData[0]);

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

  await education(page, studentData[0]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#internship", { visible: true });
  await page.click("#internship");

  await internship(page, studentData[0]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#por-resume", { visible: true });
  await page.click("#por-resume");

  await Position_Of_Responsibility(page, studentData[0]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#training-resume", { visible: true });
  await page.click("#training-resume");

  await Training(page, studentData[0]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#project-resume", { visible: true });
  await page.click("#project-resume");

  await Project(page, studentData[0]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#work-modal", { visible: true });
  await page.click("#work-modal");

  await work_sample(page, studentData[0]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#additional-form-modal", { visible: true });
  await page.click("#additional-form-modal");

  await Additional_Info(page, studentData[0]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await applications_internships(page, studentData[0]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
  });

  await page.close();
}

loadPage().catch(console.error);
}

document
  .getElementById("applyshalla")
  .addEventListener("click", applyInternshala);