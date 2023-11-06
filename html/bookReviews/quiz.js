let books = [
	{ title: "Grokking Algorithms", genre: "Programming Books" },
	{ title: "Introduction to Algorithms, 3rd Edition", genre: "Programming Books" },
	{ title: "Clean Code", genre: "Programming Books" },
	{ title: "Introduction to the Theory of Computation", genre: "Programming Books" },
	{ title: "Dune", genre: "Fantastic Books" },
	{ title: "Neuromancer", genre: "Fantastic Books" },
	{ title: "The Left Hand of Darkness", genre: "Fantastic Books" },
	{ title: "Foundation", genre: "Fantastic Books" },
	{ title: "To Kill a Mockingbird", genre: "Literary Books" },
	{ title: "Pride and Prejudice", genre: "Literary Books" },
	{ title: "The Great Gatsby", genre: "Literary Books" },
	{ title: "1984", genre: "Literary Books" }
];

const bookTitleElement = document.getElementById("bookTitle");
let currentBookIndex = 0;

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function nextQuestion() {
	if (currentBookIndex < books.length) {
		bookTitleElement.textContent = `What genre is the book "${books[currentBookIndex].title}"?`;
	} else {
		bookTitleElement.textContent = "Quiz Ended";
		document.querySelector('.options').innerHTML = '';
	}
}

shuffleArray(books);
nextQuestion();

function drag(event) {
	event.dataTransfer.setData("text", event.target.textContent);
}

function allowDrop(event) {
	event.preventDefault();
}

function drop(event) {
	event.preventDefault();
	const draggedText = event.dataTransfer.getData("text");
	const correctGenre = books[currentBookIndex].genre;
	if (draggedText === correctGenre) {
		event.target.textContent = "Correct! The book is in the " + correctGenre + " genre.";
		event.target.style.backgroundColor = "#4CAF50";
		currentBookIndex++;
		setTimeout(() => {
			event.target.textContent = "Drag the genre to this box.";
			event.target.style.backgroundColor = "transparent";
			nextQuestion();
		}, 1500);
	} else {
		event.target.textContent = "Try again. This book is not in the " + draggedText + " genre.";
		event.target.style.backgroundColor = "#FF5733";
	}
}