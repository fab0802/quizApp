"use strict";

const startScreen = document.querySelector("#start-screen");
const questionScreen = document.querySelector("#question-screen");
const startButton = document.querySelector("#start-button");
const categoryButtons = document.querySelectorAll(".category");
const categories = ["html", "css", "js"];
let questionArray = [];
let currentQuestion = 0;
let currentCategory = "html";
let quizStarted = false;
let currentAnswer;

startButton.addEventListener("click", startQuiz);

document.addEventListener("click", function (e) {
  if (categories.includes(e.target.id) && !quizStarted)
    setCategory(e.target.id);
  if (e.target.id.split("-")[0] === "answer") {
    currentAnswer = Number(e.target.id.split("-")[2]);
    console.log(currentAnswer);
    checkAnswer();
  }
});

function checkAnswer() {
  console.log(questionArray[currentQuestion].correctAnswer);
  if (currentAnswer === questionArray[currentQuestion].correctAnswer)
    console.log("correct");
}

function startQuiz() {
  startScreen.classList.add("display-none");
  questionScreen.classList.remove("display-none");
  fillQuestionArray(currentCategory);
  renderQuestion();
  setCategory(currentCategory);
  disableMenu();
  quizStarted = true;
}

function disableMenu() {
  for (let categoryButton of categoryButtons)
    categoryButton.classList.add("disabled");
}

function enableMenu() {
  for (let categoryButton of categoryButtons)
    categoryButton.classList.remove("disabled");
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

function nextQuestion() {
  currentQuestion++;
  renderQuestion();
}
