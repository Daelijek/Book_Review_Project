document.getElementById("sendButton").addEventListener("click", function () {
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const subject = document.getElementById("subject").value;
	const message = document.getElementById("subject").value;

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
		document.getElementById("subjectError").textContent = "Password is required.";
		valid = false;
	}

	if (message.trim() != subject.trim()) {
		document.getElementById("messageError").textContent = "Password do not match!";
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

function showFeedback(message, type) {
	Swal.fire({
		title: message,
		icon: type,
		timer: 3000,
		showConfirmButton: false
	});
}

function addFeedbackToList(feedbackText) {
	const feedbackList = document.getElementById('feedbackList');
	const listItem = document.createElement('li');
	listItem.innerHTML = `
			<span>${feedbackText}</span>
			<button class="delete-feedback">Delete</button>
	`;
	feedbackList.appendChild(listItem);

	// Add event listener for the delete button
	const deleteButton = listItem.querySelector('.delete-feedback');
	deleteButton.addEventListener('click', function () {
		listItem.remove();
		updateLocalStorage();
	});
}

document.getElementById('feedbackForm').addEventListener('submit', function (event) {
	event.preventDefault();

	const userFeedback = document.getElementById('userFeedback').value;
	if (userFeedback.trim() === '') {
		showFeedback('Please enter your feedback', 'error');
		return;
	}

	showFeedback('Thank you for your feedback!', 'success');
	addFeedbackToList(userFeedback);

	// Save the feedback in local storage
	const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
	feedbacks.push(userFeedback);
	localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

	document.getElementById('userFeedback').value = '';
});

function loadAndDisplayFeedbacks() {
	// Load and display stored feedbacks on page load
	const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
	storedFeedbacks.forEach((feedbackText) => {
		addFeedbackToList(feedbackText);
	});
}

function updateLocalStorage() {
	const feedbackListItems = document.querySelectorAll('#feedbackList li span');
	const feedbacks = Array.from(feedbackListItems).map(item => item.textContent);
	localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
	loadAndDisplayFeedbacks();
});

function openCity(evt, cityName) {
	// Declare all variables
	var i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";
}