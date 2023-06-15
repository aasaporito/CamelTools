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


//Add checkboxes for options on course listing page
// TODO: Loop this shit
function addListingOptions() {
  let div = document.createElement("div")
  div.setAttribute("style", "border: 2px solid black; border-radius: 5px; background-color: lightblue")

  let input1 = document.createElement("input")
  let label1 = document.createElement("label")
  let input2 = document.createElement("input")
  let label2 = document.createElement("label")
  let input3 = document.createElement("input")
  let label3 = document.createElement("label")
  let input4 = document.createElement("input")
  let label4 = document.createElement("label")

  input1.setAttribute("onchange", toggle100())
  //input2.setAttribute("onchange", toggle200())
  //input3.setAttribute("onchange", toggle300())
  //input4.setAttribute("onchange", toggle400())

  input1.setAttribute("type", "checkbox");
  input2.setAttribute("type", "checkbox");
  input3.setAttribute("type", "checkbox");
  input4.setAttribute("type", "checkbox");

  input1.setAttribute("checked", "true");
  input2.setAttribute("checked", "true");
  input3.setAttribute("checked", "true");
  input4.setAttribute("checked", "true");

  input1.setAttribute("class", "camelUtilsSA");
  input2.setAttribute("class", "camelUtilsSA");
  input3.setAttribute("class", "camelUtilsSA");
  input4.setAttribute("class", "camelUtilsSA");

  input1.setAttribute("id", "100");
  label1.setAttribute("for", "100");
  label1.innerText = "100";

  div.appendChild(input1);
  div.appendChild(label1); // 100 ^^^^


  //200s
  input2.setAttribute("id", "200");

  label2.setAttribute("for", "200");
  label2.innerText = "200";

  div.appendChild(input2);
  div.appendChild(label2); // 200 ^^^

  //300s
  input3.setAttribute("id", "300");

  label3.setAttribute("for", "300");
  label3.innerText = "300";

  div.appendChild(input3);
  div.appendChild(label3); // 300 ^^^

  //400s
  input4.setAttribute("id", "400");

  label4.setAttribute("for", "400");
  label4.innerText = "400";

  div.appendChild(input4);
  div.appendChild(label4); // 400 ^^^

  document.getElementsByTagName("td")[0].parentElement.parentElement.after(div)
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