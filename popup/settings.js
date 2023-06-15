const c1 = document.getElementById('c1');
const c2 = document.getElementById('c2');
const c3 = document.getElementById('c3');
const c4 = document.getElementById('c4');

const result = document.getElementById('result');

const inputHandler = function(e) {
  //result.innerHTML = e.target.value;
  saveOptions(e, e.target.id, e.target.value)
}

function saveOptions(e, c, num) {
  console.log(c)
  console.log(num)
  //e.preventDefault();
  browser.storage.sync.set({
    c: num
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#c1").value = result.value || "blue";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("c1");
  console.log("c1");
  getting.then(setCurrentChoice, onError);
}


c1.addEventListener('input', inputHandler);
c1.addEventListener('propertychange', inputHandler); // for IE8

c2.addEventListener('input', inputHandler);
c2.addEventListener('propertychange', inputHandler); 

c3.addEventListener('input', inputHandler);
c3.addEventListener('propertychange', inputHandler); 

c4.addEventListener('input', inputHandler);
c4.addEventListener('propertychange', inputHandler); 

restoreOptions()