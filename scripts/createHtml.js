"use strict";

function createQuestionHtml() {
  return `
        <h2 class="question">${questionArray[currentQuestion].question}</h2>
        <div class="answer-row">
            <div class="answer-number">A</div>
            <div class="answer-text">${
              questionArray[currentQuestion].answers[0]
            }</div>
        </div>
        <div class="answer-row">
            <div class="answer-number">B</div>
            <div class="answer-text">${
              questionArray[currentQuestion].answers[1]
            }</div>
        </div>
        <div class="answer-row">
            <div class="answer-number">C</div>
            <div class="answer-text">${
              questionArray[currentQuestion].answers[2]
            }</div>
        </div>
        <footer>
            <div class="questionCounter">Frage ${currentQuestion + 1} von ${
    questionArray.length
  }</div>
            <button class="btn btn-primary" id="start-button">Next</button>
        </footer>
    `;
}
