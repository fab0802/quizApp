"use strict";

function createQuestionHtml() {
  return `
        <h2 class="question">${questionArray[currentQuestion].question}</h2>
        <div class="answer-row" id="answer-row-0">
            <div class="answer-number" id="answer-number-0">A</div>
            <div class="answer-text" id="answer-text-0">${
              questionArray[currentQuestion].answers[0]
            }</div>
        </div>
        <div class="answer-row" id="answer-row-1">
            <div class="answer-number" id="answer-number-1">B</div>
            <div class="answer-text" id="answer-text-1">${
              questionArray[currentQuestion].answers[1]
            }</div>
        </div>
        <div class="answer-row" id="answer-row-2">
            <div class="answer-number" id="answer-number-2">C</div>
            <div class="answer-text" id="answer-text-2">${
              questionArray[currentQuestion].answers[2]
            }</div>
        </div>
        <footer>
            <div class="question-counter">Frage ${currentQuestion + 1} von ${
    questionArray.length
  }</div>
            <button class="disabled" onclick="nextQuestion()" id="next-button">Next</button>
        </footer>
    `;
}
