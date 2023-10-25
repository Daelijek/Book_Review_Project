var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
	if(inputBox.value === ''){
		alert("You must write something!");
	}
	else {
		let li = document.createElement("li");
		li.innerHTML = inputBox.value;
		listContainer.appendChild(li);
		let span = document.createElement("span");
		span.innerHTML = "\u00d7";
		li.appendChild(span);
	}
	inputBox.value = "";
	saveData();
}

listContainer.addEventListener("click", function(e){
	if(e.target.tagName === "LI"){
		e.target.classList.toggle("checked");
		saveData();
	}
	else if(e.target.tagName === "SPAN") {
		e.target.parentElement.remove();
		saveData();
	}
}, false);

function saveData(){
	localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
	listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

document.getElementById("sendButton").addEventListener("click", function () {
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const subject = document.getElementById("subject").value;
	const message = document.getElementById("message").value;

	// Reset error messages
	document.getElementById("nameError").textContent = "";
	document.getElementById("emailError").textContent = "";
	document.getElementById("subjectError").textContent = "";
	document.getElementById("messageError").textContent = "";

	let valid = true;

	if (name.trim() === "") {
			document.getElementById("nameError").textContent = "Name is required.";
			valid = false;
	}

	if (email.trim() === "") {
			document.getElementById("emailError").textContent = "Email is required.";
			valid = false;
	} else if (!validateEmail(email)) {
			document.getElementById("emailError").textContent = "Invalid email format.";
			valid = false;
	}

	if (subject.trim() === "") {
			document.getElementById("subjectError").textContent = "Subject is required.";
			valid = false;
	}

	if (message.trim() === "") {
			document.getElementById("messageError").textContent = "Message is required.";
			valid = false;
	}

	if (valid) {
			// Form is valid, you can proceed with form submission or other actions
			alert("Form submitted successfully!");
			// Clear form fields
			document.getElementById("contactForm").reset();
	}
});

function validateEmail(email) {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(email);
}


let timerInterval;
const timerDisplay = document.getElementById("timer");
const durationInput = document.getElementById("duration");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);

function startTimer() {
    const duration = parseInt(durationInput.value);
    let timeLeft = duration;

    timerInterval = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.innerText = "0";
            // Добавьте функцию для выполнения при завершении таймера
            timerEnded();
        } else {
            displayTimeLeft(timeLeft);
            timeLeft--;
        }
    }, 1000);

    startButton.disabled = true;
    stopButton.disabled = false;
    durationInput.disabled = true;
}

function stopTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
    durationInput.disabled = false;
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    timerDisplay.innerText = display;
}

function timerEnded() {
    // Добавьте желаемые действия при завершении таймера здесь
    alert("Таймер завершился!");
}