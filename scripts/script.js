"use strict";

const startScreen = document.querySelector("#start-screen");
const questionScreen = document.querySelector("#question-screen");
const startButton = document.querySelector("#start-button");
const categoryButtons = document.querySelectorAll(".category");
const categories = ["html", "css", "js"];
const progressBar = document.querySelector("#progress-bar");
let questionArray = [];
let currentQuestion = 0;
let currentCategory = "html";
let quizStarted = false;
let userAnswer;
let answeredQuestions = 0;
let score = 0;
let isQuestionOpen = false;

startButton.addEventListener("click", startQuiz);

document.addEventListener("click", function (e) {
  // check click on menu items
  if (categories.includes(e.target.id) && !quizStarted)
    setCategory(e.target.id);

  // check click on answers
  if (e.target.id.split("-")[0] === "answer" && isQuestionOpen) {
    userAnswer = Number(e.target.id.split("-")[2]);
    checkAnswer();
    setProgress();
  }
});

function checkAnswer() {
  if (userAnswer !== questionArray[currentQuestion].correctAnswer) {
    colorizeWrongAnswer();
  } else {
    score++;
  }
  colorizeCorrectAnswer();
  closeQuestion();
  answeredQuestions++;
}

function colorizeCorrectAnswer() {
  const correctAnswerRow = document.querySelector(
    `#answer-row-${questionArray[currentQuestion].correctAnswer}`
  );
  correctAnswerRow.classList.add("correct");
}

function colorizeWrongAnswer() {
  const wrongAnswerRow = document.querySelector(`#answer-row-${userAnswer}`);
  wrongAnswerRow.classList.add("wrong");
}

function startQuiz() {
  startScreen.classList.add("display-none");
  questionScreen.classList.remove("display-none");
  fillQuestionArray(currentCategory);
  renderQuestion();
  setCategory(currentCategory);
  disableMenu();
  quizStarted = true;
  openQuestion();
  score = 0;
  answeredQuestions = 0;
}

function closeQuestion() {
  const answersContainer = document.querySelector("#answers");
  answersContainer.classList.add("closed");
  isQuestionOpen = false;
  enableNextButton();
}

function openQuestion() {
  const answersContainer = document.querySelector("#answers");
  answersContainer.classList.remove("closed");
  isQuestionOpen = true;
  disableNextButton();
}

function disableMenu() {
  for (let categoryButton of categoryButtons)
    categoryButton.classList.add("disabled");
}

function enableMenu() {
  for (let categoryButton of categoryButtons)
    categoryButton.classList.remove("disabled");
}

function disableNextButton() {
  const nextButton = document.querySelector("#next-button");
  nextButton.classList.add("disabled");
}

function enableNextButton() {
  const nextButton = document.querySelector("#next-button");
  nextButton.classList.remove("disabled");
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
  if (!isQuestionOpen) {
    openQuestion();
    if (currentQuestion < questionArray.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      // TODO show endscreen
    }
  }
}

function setProgress() {
  if (answeredQuestions === questionArray.length) {
    progressBar.classList.add("progress-bar-full");
  }
  const progress = 100 - (100 * answeredQuestions) / questionArray.length;
  progressBar.style.right = `${progress}%`;
}

function resetProgress() {
  progressBar.style.right = "100%";
  progressBar.classList.remove("progress-bar-full");
}
