const questions = [
    {
        question: "Wählen Sie den Deepfake.",
        answers: [
            { text: "Video A", url: "https://www.youtube.com/embed/-lYz611nwhI?si=iwSdBcxwfeenho75?&autoplay=1", correct: true },
            { text: "Video B", url: "https://www.youtube.com/embed/gwfaocsokTM?si=LdABItd86mgAH94n?&autoplay=1", correct: false }
        ]
    },
    {
        question: "Wählen Sie den Deepfake.",
        answers: [
            { text: "Video C", url: "https://www.youtube.com/embed/4x-BcYCiKCk?si=gijiCgLB-eYoWsvv?&autoplay=1", correct: false },
            { text: "Video D", url: "https://www.youtube.com/embed/-lYz611nwhI?si=iwSdBcxwfeenho75?&autoplay=1", correct: true }
        ]
    },
    {
        question: "Wählen Sie den Deepfake.",
        answers: [
            { text: "Video E", url: "https://www.youtube.com/embed/gwfaocsokTM?si=LdABItd86mgAH94n?&autoplay=1", correct: false },
            { text: "Video F", url: "https://www.youtube.com/embed/4x-BcYCiKCk?si=gijiCgLB-eYoWsvv?&autoplay=1", correct: true }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const videoContainer = document.getElementById("vids");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Weiter";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        const iframeVid = document.createElement("iframe");
        button.innerHTML = answer.text;
        iframeVid.width = "100%";
        iframeVid.height = "100%";
        iframeVid.src = answer.url;
        iframeVid.title = "Youtube video player";
        iframeVid.frameBorder = "0";
        iframeVid.allow = "accelerometer; encrypted-media; autoplay;";
        iframeVid.allowFullscreen === "true";
        button.classList.add("btn");
        answerButtons.appendChild(button);
        videoContainer.appendChild(iframeVid);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    while (videoContainer.firstChild) {
        videoContainer.removeChild(videoContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Du hast ${score} von ${questions.length} Deepfakes richtig bestimmt!`;
    nextButton.innerHTML = "Nochmal";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
