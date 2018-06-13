var question = document.querySelector("#question");
var button = document.querySelector("#playnow");
var boxes = document.querySelectorAll(".squares");
var right = document.querySelectorAll(".right");
var jt = document.querySelector(".jt");
var answerdiv = document.querySelector("#answer");
var tempQuestion;
var randomQuestion = [];


for (var i = 0; i < boxes.length; i++) {
	boxes[i].style.backgroundColor = "rgb(35, 26, 132)" ;
}


button.addEventListener("click", function() {
	var r = Math.floor((Math.random() * 255) + 1);
	var g = Math.floor((Math.random() * 255) + 1);
	var b = Math.floor((Math.random() * 255) + 1);
	tempQuestion = "rgb("  + r  +", "  + g +", " + b  + ")";
	question.textContent = "R G B ("  + r  +", "  + g +", " + b  + ")";

	for (var i = 0; i < boxes.length; i++) {

	var r = Math.floor((Math.random() * 255) + 1);
	var g = Math.floor((Math.random() * 255) + 1);
	var b = Math.floor((Math.random() * 255) + 1);
	randomQuestion[i] = "rgb("  + r  +", "  + g +", " + b  + ")";
	boxes[i].style.backgroundColor = randomQuestion[i];
	
	}

	var twick = Math.floor((Math.random() * 5) + 0);	
	boxes[twick].style.backgroundColor = tempQuestion;
		
	for (var k = 0; k < boxes.length; k++) {

	boxes[k].addEventListener("click", boxAnswer.bind(this, k, boxes, tempQuestion, right, jt, button, answerdiv), false);
			
}

});


function boxAnswer (t, boxNum, question, displayText, jt1, playagain, answerdiv) {
	if (boxNum[t].style.backgroundColor == question) {
			displayText[0].textContent = "Wow!";
			displayText[1].textContent = "You";
			displayText[2].textContent = "got";
			displayText[3].textContent = "it";
			displayText[4].textContent = "Right";
					for (var i = 0; i < boxNum.length; i++) {
						boxNum[i].style.backgroundColor = question;
					}
			jt1.style.backgroundColor = question;
			answerdiv.style.backgroundColor = question;
			playagain.textContent = "\xa0\xa0\xa0" + "Try " +"\xa0" + "again"+ "\xa0" + "?" + "\xa0\xa0\xa0";
			playagain.addEventListener("click", function() {
				window.location.reload()
			});
	}

	else {
				boxNum[t].style.backgroundColor = "rgb(255, 255, 255)";
	}
}