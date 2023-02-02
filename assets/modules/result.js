import { questions } from "./questions.js"
import { quizContainer } from "./elements.js";

const resultsContainer = document.getElementById('results')


export function showResults() {

    const answerContainers = quizContainer.querySelectorAll('.answers');

    const puzzlePieces = quizContainer.querySelectorAll('.puzzlePiece');
    const hintConfirmDialogs = quizContainer.querySelectorAll('.hintConfirmDialog');
    const hintDialogs = quizContainer.querySelectorAll('.hintDialog');

    let numCorrect = 0;

    questions.forEach((currentQuestion, questionNumber) => {

        const answerContainer = answerContainers[questionNumber];
        const puzzlePieceContainer = puzzlePieces[questionNumber];
        puzzlePieceContainer.title = "Klicken um Hinweis zu zeigen.";

        const hintConfirmDialog = hintConfirmDialogs[questionNumber];
        const hintDialog = hintDialogs[questionNumber];
        onShowHint(puzzlePieceContainer, hintConfirmDialog, hintDialog);

        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (currentQuestion.correctAnswer === userAnswer) {

            numCorrect++;

            onCorrect(answerContainer, puzzlePieceContainer);

        } else {

            onWrong(answerContainer, puzzlePieceContainer);

        }
    });

    let questionsAnsweredResumee = `${numCorrect} von ${questions.length} Fragen korrekt!`;

    if (0 === numCorrect)
        questionsAnsweredResumee = "😨 keine Frage richtig beantwortet! 🙈 Gib nicht auf, gehe nochmal zurück und versuche es weiter."
    else if (questions.length === numCorrect)
        questionsAnsweredResumee = "🤩 Glückwunsch, Du hast alle Fragen richtig beantwortet 🥳! Nun musst Du das Emoji-Rätsel noch lösen 🤔. Sag Bescheid, wenn Du glaubst die Lösung zu kennen 🧠.";
    resultsContainer.textContent = questionsAnsweredResumee;

}

function onWrong(answerContainer, puzzlePieceContainer) {

    answerContainer.style.color = 'red';
    puzzlePieceContainer.style.display = 'none';

}

function onCorrect(answerContainer, puzzlePieceContainer) {

    answerContainer.style.color = 'green';
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
