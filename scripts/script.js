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
let userAnswer;
let isQuestionOpen = false;

startButton.addEventListener("click", startQuiz);

document.addEventListener("click", function (e) {
  // check click on menu items
  if (categories.includes(e.target.id) && !quizStarted)
    setCategory(e.target.id);

  // check click on answers
  if (e.target.id.split("-")[0] === "answer") {
    userAnswer = Number(e.target.id.split("-")[2]);
    console.log(userAnswer);
    checkAnswer();
  }
});

function checkAnswer() {
  if (isQuestionOpen) {
    console.log(isQuestionOpen);
    if (userAnswer === questionArray[currentQuestion].correctAnswer) {
      console.log("correct");
      colorizeCorrectAnswer();
      closeQuestion();
    } else {
      console.log("wrong");
      colorizeWrongAnswer();
      colorizeCorrectAnswer();
      closeQuestion();
    }
    closeQuestion();
  }
}

function colorizeCorrectAnswer() {
  //TODO
  const correctAnswerRow = document.querySelector(
    `#answer-row-${questionArray[currentQuestion].correctAnswer}`
  );
  correctAnswerRow.classList.add("correct");
}

function colorizeWrongAnswer() {
  //TODO
  console.log(userAnswer);
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
