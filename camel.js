/** TO ADD:
 *  - Filter by class level (100, 200, 300 etc)
 * 
 * */

let allSelected = false;

// Hide full courses from results
function hideFullCourses() {
  const coll = document.getElementsByClassName("bwckschd_det");
  const toDel = [];

  for (let i = 0; i < coll.length; i += 19) {

    const genRemaining = coll[i + 13]
    const xlRemaining = coll[i + 16]
    const xlCap = coll[i + 14]

    if (xlCap.innerText != 0) { //When the course has XL seating
      if (parseInt(xlRemaining.innerText) <= 0) {
        toDel.push(xlRemaining.parentElement)
      }
    } else if (parseInt(genRemaining.innerText) <= 0) {
      toDel.push(genRemaining.parentElement)
    }
  }

  for (let i = 0; i < toDel.length; i += 1) {
    toDel[i].remove();
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

function addSelectAllButton() {
  const input = document.createElement("input")
  const label = document.createElement("label")

  input.setAttribute("type", "checkbox");
  input.setAttribute("id", "checkAll");
  input.setAttribute("class", "camelUtilsSA");

  label.setAttribute("for", "checkAll");
  label.innerText = "Select all departments";

  document.getElementsByClassName("dataentrytable")[0].after(input);
  document.getElementsByClassName("camelUtilsSA")[0].after(label);

  const selectElement = document.querySelector(".camelUtilsSA");
  selectElement.addEventListener('change', (event) => {
    console.log(allSelected)
    selectAllCourses();
  })
}


/* 
Runs from here
*/
const URL = window.location.href;
hideAlertBoxes(); //All pages

//Course listing 
if (URL == "https://ssb-prod.ec.conncoll.edu/PROD/bwckschd.p_get_crse_unsec") {
  hideFullCourses();
  console.log("Hid courses")
} //Search Options Page
else if (URL == "https://ssb-prod.ec.conncoll.edu/PROD/bwckgens.p_proc_term_date") {
  addSelectAllButton();
}