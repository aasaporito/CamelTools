const coll = document.getElementsByClassName("bwckschd_det");
const introCourses = []


for (let i = 2; i < coll.length; i+=19) {
        if (parseInt(coll[i].innerText) < 200)
        {
          introCourses.push(coll[i].parentElement)
        }

//


//Remove duplicates
let temp = introCourses[0]
let cleanList = []
for(let j = 0; j <introCourses.length; j++) {
	temp = introCourses[j];
	for (let i = 1; i < introCourses.length; i++) {
		if (temp.children[6].innerText == introCourses[i].children[6].innerText) {
			break;
		} else {
			cleanList.push(introCourses[i])
			
		}
	}
}

let total = 0

for(let i = 0; i < introCourses.length; i++) {
  if (parseInt(introCourses[i].children[14].innerText > 0)) {
	//Cross list double counts
	total += parseInt(introCourses[i].children[16].innerText)
	} else {
		total += parseInt(introCourses[i].children[13].innerText)
		}
}

