/** TO ADD:
 *  - Filter by class level (100, 200, 300 etc)
 * 
 * */

let allSelected = false;
let isHidden = false;

// Hide full courses from results
function hideFullCourses() {
  const coll = document.getElementsByClassName("bwckschd_det");

  for (let i = 0; i < coll.length; i += 19) {

    const genRemaining = coll[i + 13]
    const xlRemaining = coll[i + 16]
    const xlCap = coll[i + 14]

    if (xlCap.innerText != 0) { //When the course has XL seating
      if (parseInt(xlRemaining.innerText) <= 0) {
        if (isHidden) {
          xlRemaining.parentElement.style.display = ""
        } else {
          xlRemaining.parentElement.style.display = "none"
        }
      }
    } else if (parseInt(genRemaining.innerText) <= 0) {
      if (isHidden) {
        genRemaining.parentElement.style.display = ""
      } else {
        genRemaining.parentElement.style.display = "none"
      }
    }
  }

  if (isHidden) {
    isHidden = false;
  } else {
    isHidden = true;
  }
}

//Hide annoying CSS error messages
function hideAlertBoxes() {
  const boxes = document.getElementsByClassName("modalContainer");

  for (let i = boxes.length - 1; i >= 0; i--) {
    boxes[i].remove();
  }
}

// Select all courses in search options
function selectAllCourses() {
  const subjects = document.getElementsByName("sel_subj")[1].getElementsByTagName("option")
  if (allSelected == false) {
    for (let i = 0; i < subjects.length; i++) {
      subjects[i].selected = true
    }
    allSelected = true;
  } else {
    for (let i = 0; i < subjects.length; i++) {
      subjects[i].selected = false
    }
    allSelected = false;
  }
}

function addHideFullCourseButton() {
  const button = document.createElement("button")
  const label = document.createElement("label")

  button.setAttribute("data", "test");
  button.setAttribute("id", "hideFull");
  button.setAttribute("class", "camelUtilsSA");
  button.innerText = "Hide full courses"

  document.getElementsByClassName("infotextdiv")[0].after(button);

  const selectElement = document.querySelector(".camelUtilsSA");
  selectElement.addEventListener('click', (event) => {
    console.log("Hiding full courses")
    hideFullCourses();
  })
}



// Select all subjects
function addSelectAllButton() {
  const input = document.createElement("input")
  const label = document.createElement("label")

  input.setAttribute("type", "checkbox");
  input.setAttribute("id", "hideFull");
  input.setAttribute("class", "camelUtilsSA");

  label.setAttribute("for", "checkAll");

  label.innerText = "Select all departments";

  document.getElementsByClassName("data").after(input);
  document.getElementsByClassName("camelUtilsSA")[0].after(label);

  const selectElement = document.querySelector(".camelUtilsSA");
  selectElement.addEventListener('change', (event) => {
    console.log(allSelected)
    selectAllCourses();
  })
}
function setValue(c) {

  let str = Object.keys(c)[0]
  document.getElementById("crn_id" +str.slice(-1)).value = c[str];
}

/* 
Runs from here
*/
const URL = window.location.href;
hideAlertBoxes(); //All pages

//Course listing 
if (URL == "https://ssb-prod.ec.conncoll.edu/PROD/bwckschd.p_get_crse_unsec") {
  addHideFullCourseButton();
  console.log("Hid courses")
} //Search Options Page
else if (URL == "https://ssb-prod.ec.conncoll.edu/PROD/bwckgens.p_proc_term_date") {
  addSelectAllButton(); 
} //Course registration page 
else if (URL == "https://ssb-prod.ec.conncoll.edu/PROD/bwskfreg.P_AltPin"
  && document.getElementById("pagetitle").innerText == "Add/Drop Classes") {

  let c = browser.storage.sync.get("c1");
  c.then(setValue);

  c = browser.storage.sync.get("c2");
  c.then(setValue);

  c = browser.storage.sync.get("c3");
  c.then(setValue);

  c = browser.storage.sync.get("c4");
  c.then(setValue);
  //todo this needs a toggle of some sort, or else it will happen repeatedly
  //document.getElementsByName("REG_BTN")[1].click()

}