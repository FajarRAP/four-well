const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

const questions = [
    {
        question: 'Apa yang dapat membantu mengurangi risiko penyakit jantung?',
        choice1: 'Merokok dan minum alkohol secara teratur',
        choice2: 'Makan makanan tinggi kolesterol',
        choice3: 'Berhenti merokok, makan makanan sehat, dan berolahraga secara teratur',
        choice4: 'Mengonsumsi makanan berlemak tinggi',
        answer: 3,
    },
    {
        question: "Aktivitas fisik yang teratur membantu mengurangi risiko penyakit jantung dengan cara?",
        choice1: "Menurunkan kadar HDL (kolesterol baik)",
        choice2: "Meningkatkan tekanan darah",
        choice3: "Memperbaiki fungsi jantung dan pembuluh darah",
        choice4: "Meningkatkan risiko diabetes tipe 2",
        answer: 3,
    },
    {
        question: "Apa peran diet sehat dalam pencegahan penyakit jantung?",
        choice1: "Meningkatkan risiko kolesterol tinggi",
        choice2: "Mengurangi risiko penyumbatan pembuluh darah",
        choice3: "Menurunkan denyut jantung",
        choice4: "Meningkatkan tekanan darah",
        answer: 2,
    },
    {
        question: "Mengontrol tekanan darah dapat membantu mencegah penyakit jantung dengan cara?",
        choice1: "Meningkatkan risiko aterosklerosis",
        choice2: "Memperburuk fungsi jantung",
        choice3: "Mengurangi beban kerja jantung",
        choice4: "Meningkatkan risiko diabetes tipe 1",
        answer: 3,
    },
    {
        question: "Apa yang dimaksud dengan indeks massa tubuh (BMI) yang sehat dalam konteks pencegahan penyakit jantung?",
        choice1: "BMI tinggi berhubungan dengan risiko lebih rendah",
        choice2: "BMI rendah berhubungan dengan risiko lebih rendah",
        choice3: "BMI normal berhubungan dengan risiko lebih rendah",
        choice4: "BMI tidak memiliki korelasi dengan risiko penyakit jantung",
        answer: 3,
    }
]

const SCORE_POINTS = 20
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('gameOver.html')
    }

    questionCounter++
    progressText.innerText = `Pertanyaan ${questionCounter} dari ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()