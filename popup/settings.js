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
  var obj = {}
  obj[c] = num
  console.log(obj)
  //e.preventDefault();
  browser.storage.sync.set(obj);
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.getElementById(Object.keys(result)[0]).value = result[Object.keys(result)[0]] || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("c1");
  getting.then(setCurrentChoice, onError);

  getting = browser.storage.sync.get("c2");
  getting.then(setCurrentChoice, onError);

  getting = browser.storage.sync.get("c3");
  getting.then(setCurrentChoice, onError);

  getting = browser.storage.sync.get("c4");
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