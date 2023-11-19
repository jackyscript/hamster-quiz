import { questions } from "./modules/questions.js"
import { showResults } from "./modules/result.js";
import { quizContainer, submitButton, splashScreen, startQuizButton } from "./modules/elements.js";
import { StyleConstants as Style } from "./modules/styles.js";

//splash IIFE
(function initSplash() {

    startQuizButton.addEventListener('click', () => {

        splashScreen.style.opacity = 0;
        setTimeout(() => {

            splashScreen.classList.add('hidden')

        }, 610)

    });

})();

function buildQuiz() {

    const output = [];

    questions.forEach(
        (currentQuestion, questionNumber) => {

            const answers = [];

            addAnswer(currentQuestion, answers, questionNumber);

            addQuestionSlide(output, currentQuestion, answers);
        }
    );

    quizContainer.innerHTML = output.join('');
}

function addAnswer(currentQuestion, answers, questionNumber) {

    Object.keys(currentQuestion.answers).forEach(letter => {
        answers.push(
            `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
            </label>`
        );
    });

}

function addQuestionSlide(output, currentQuestion, answers) {

    output.push(
        `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join(" ")} </div>
              <div class="puzzlePiece"> ${currentQuestion.puzzlePiece} </div>
              <dialog class="hintConfirmDialog">
                <p>Hinweis zeigen?</p>
                <form method="dialog">
                    <button value="cancel">Ich versuchs doch noch selber</button>
                    <button value="default">Argh ich weiß nicht mehr weiter</button>
                </form>
              </dialog>
              <dialog class="hintDialog">
                <p>${currentQuestion.hint}</p>
                <form method="dialog">
                    <button>OK</button>
                </form>
              </dialog>
            </div>`
    );

}

function showSlide(n) {

    slides[currentSlide].classList.remove(Style.ACTIVE);
    slides[n].classList.add(Style.ACTIVE);

    currentSlide = n;

    previousButton.style.display = currentSlide === 0 ? Style.HIDDEN : Style.VISIBLE;

    if (currentSlide === slides.length - 1) {

        nextButton.style.display = Style.HIDDEN;
        submitButton.style.display = Style.VISIBLE;

    } else {

        nextButton.style.display = Style.VISIBLE;
        submitButton.style.display = Style.HIDDEN;

    }
}

function showNextSlide() {

    showSlide(currentSlide + 1);

}

function showPreviousSlide() {

    showSlide(currentSlide - 1);

}

buildQuiz();

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(currentSlide);

submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);