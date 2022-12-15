"use strict";

const startButton = document.querySelector("#start-button");
const startScreen = document.querySelector("#start-screen");
const questionScreen = document.querySelector("#question-screen");

function intiQuiz() {
  startScreen.classList.add("display-none");
  questionScreen.classList.remove("display-none");
}

startButton.addEventListener("click", intiQuiz);
