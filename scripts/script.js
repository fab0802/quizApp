"use strict";

const startScreen = document.querySelector("#start-screen");
const questionScreen = document.querySelector("#question-screen");
const endScreen = document.querySelector("#end-screen");
const startButton = document.querySelector("#start-button");
const categoryButtons = document.querySelectorAll(".category");
const categories = ["html", "css", "js"];
const progressBar = document.querySelector("#progress-bar");
const AUDIO_CORRECT = new Audio("audio/correct.mp3");
const AUDIO_WRONG = new Audio("audio/wrong.mp3");
let questionArray = [];
let currentQuestion = 0;
let currentCategory = "html";
let quizStarted = false;
let userAnswer;
let answeredQuestions = 0;
let score = 0;
let isQuestionOpen = false;

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startScreen.classList.add("display-none");
  questionScreen.classList.remove("display-none");
  endScreen.classList.add("display-none");
  fillQuestionArray(currentCategory);
  renderQuestion();
  setCategory(currentCategory);
  disableMenu();
  quizStarted = true;
  openQuestion();
  score = 0;
  answeredQuestions = 0;
  setProgress();
}

function fillQuestionArray(category) {
  questionArray = quiz.filter((question) => {
    return question.category === category;
  });
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

function renderQuestion() {
  questionScreen.innerHTML = createQuestionHtml();
}

function disableMenu() {
  for (let categoryButton of categoryButtons)
    categoryButton.classList.add("disabled");
}

function enableMenu() {
  for (let categoryButton of categoryButtons)
    categoryButton.classList.remove("disabled");
}

function openQuestion() {
  const answersContainer = document.querySelector("#answers");
  answersContainer.classList.remove("closed");
  isQuestionOpen = true;
  disableNextButton();
}

function closeQuestion() {
  const answersContainer = document.querySelector("#answers");
  answersContainer.classList.add("closed");
  isQuestionOpen = false;
  enableNextButton();
}

function setProgress() {
  if (answeredQuestions === questionArray.length) {
    progressBar.classList.add("progress-bar-full");
  }
  const progress = 100 - (100 * answeredQuestions) / questionArray.length;
  progressBar.style.right = `${progress}%`;
}

document.addEventListener("click", checkMenunAndAnswerClick);

function checkMenunAndAnswerClick(e) {
  // check click on menu items
  if (categories.includes(e.target.id) && !quizStarted)
    setCategory(e.target.id);

  // check click on answers
  if (e.target.id.split("-")[0] === "answer" && isQuestionOpen) {
    userAnswer = Number(e.target.id.split("-")[2]);
    checkAnswer();
    setProgress();
  }
}

function checkAnswer() {
  if (userAnswer !== questionArray[currentQuestion].correctAnswer) {
    colorizeWrongAnswer();
    AUDIO_WRONG.play();
  } else {
    score++;
    AUDIO_CORRECT.play();
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

function restartQuiz() {
  startScreen.classList.remove("display-none");
  questionScreen.classList.add("display-none");
  endScreen.classList.add("display-none");
  enableMenu();
  closeQuestion();
  quizStarted = false;
  answeredQuestions = 0;
  currentQuestion = 0;
  score = 0;
  resetProgress();
}

function disableNextButton() {
  const nextButton = document.querySelector("#next-button");
  nextButton.classList.add("disabled");
}

function enableNextButton() {
  const nextButton = document.querySelector("#next-button");
  nextButton.classList.remove("disabled");
}

function nextQuestion() {
  if (!isQuestionOpen) {
    openQuestion();
    if (currentQuestion < questionArray.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      showEndscreen();
    }
  }
}

function resetProgress() {
  progressBar.style.right = "100%";
  progressBar.classList.remove("progress-bar-full");
}

function showEndscreen() {
  questionScreen.classList.add("display-none");
  endScreen.classList.remove("display-none");
  renderScore();
}

function renderScore() {
  const scoreContainer = document.querySelector("#score");
  scoreContainer.innerHTML = `${score} / ${questionArray.length}`;
}
