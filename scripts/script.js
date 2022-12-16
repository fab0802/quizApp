"use strict";

const startButton = document.querySelector("#start-button");
const startScreen = document.querySelector("#start-screen");
const questionScreen = document.querySelector("#question-screen");
const categoryButtons = document.querySelectorAll(".category");
const categories = ["html", "css", "js"];
let questionArray = [];
let currentQuestion = 0;
let currentCategory = "html";
let quizStarted = false;

startButton.addEventListener("click", startQuiz);

document.addEventListener("click", function (e) {
  if (categories.includes(e.target.id)) setCategory(e.target.id);
});

function startQuiz() {
  startScreen.classList.add("display-none");
  questionScreen.classList.remove("display-none");
  fillQuestionArray(currentCategory);
  renderQuestion();
  setCategory(currentCategory);
  quizStarted = true;
}

function renderQuestion() {
  questionScreen.innerHTML = createQuestionHtml();
}

function setCategory(category) {
  for (let categoryButton of categoryButtons) {
    categoryButton.classList.remove("selected");
    if (categoryButton.id === category) {
      categoryButton.classList.add("selected");
    }
  }
  currentCategory = category;
}

function fillQuestionArray(category) {
  questionArray = quiz.filter((question) => {
    return question.category === category;
  });
}
