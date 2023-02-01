import { questions } from "./questions.js"
import { quizContainer } from "./elements.js";

const resultsContainer = document.getElementById('results')


export function showResults() {

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    // gather puzzle pieces
    const puzzlePieces = quizContainer.querySelectorAll('.puzzlePiece');
    const hintConfirmDialogs = quizContainer.querySelectorAll('.hintConfirmDialog');
    const hintDialogs = quizContainer.querySelectorAll('.hintDialog');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    questions.forEach((currentQuestion, questionNumber) => {

        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const puzzlePieceContainer = puzzlePieces[questionNumber];
        puzzlePieceContainer.title = "Klicken um Hinweis zu zeigen.";
        const hintConfirmDialog = hintConfirmDialogs[questionNumber];
        const hintDialog = hintDialogs[questionNumber];
        onShowHint(puzzlePieceContainer, hintConfirmDialog, hintDialog);
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if (currentQuestion.correctAnswer === userAnswer) {
            // add to the number of correct answers
            numCorrect++;

            onCorrect(answerContainer, puzzlePieceContainer);

        }
        // if answer is wrong or blank
        else {
            onWrong(answerContainer, puzzlePieceContainer);
        }
    });

    // show number of correct answers out of total
    let questionsAnsweredResumee = `${numCorrect} von ${questions.length} Fragen richtig.`;

    if (0 === numCorrect)
        questionsAnsweredResumee = "😨 keine Frage richtig beantwortet!"
    else if (questions.length === numCorrect)
        questionsAnsweredResumee = "🤩 Glückwunsch, Du hast alle Fragen richtig beantwortet 🥳!  Nun musst Du das Rätsel noch lösen 🤔. Sag Bescheid, wenn Du denkst die Lösung zu wissen 🧠.";
    resultsContainer.textContent = questionsAnsweredResumee;
}

function onWrong(answerContainer, puzzlePieceContainer) {

    answerContainer.style.color = 'red';
    // hide puzzle
    puzzlePieceContainer.style.display = 'none';

}

function onCorrect(answerContainer, puzzlePieceContainer) {

    answerContainer.style.color = 'green';
    // show puzzle pieces
    puzzlePieceContainer.style.display = "block";

}

function onShowHint(puzzlePieceContainer, hintConfirmDialog, hintDialog) {

    puzzlePieceContainer.addEventListener('click', () => {
        hintConfirmDialog.showModal();
    });

    hintConfirmDialog.addEventListener('close', () => {
        if (hintConfirmDialog.returnValue == "default")
            hintDialog.showModal();
    });

}
