"use strict";

const startButton = document.querySelector("#start-button");
const startScreen = document.querySelector("#start-screen");
const questionScreen = document.querySelector("#question-screen");
let currentQuestion = 0;

startButton.addEventListener("click", intiQuiz);

function intiQuiz() {
  startScreen.classList.add("display-none");
  questionScreen.classList.remove("display-none");
}

//TODO create renderQuestion function
function renderQuestion() {
  console.log();
}
