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

let questions = [{
    question: 'Apakah Dimas Punya Pacar?',
    choice1: 'tidak',
    choice2: 'punya',
    choice3: 'punya 2',
    choice4: 'punya 3',
    answer: 1,
},
{
    question: "Jogja letaknya dimana?",
    choice1: "Jawa Tengah",
    choice2: "Ganjar",
    choice3: "Malaysia",
    choice4: "Tanggerang",
    answer: 1,
},
{
    question: "Coba Tebak jawaban yang benar yang mana",
    choice1: "ini",
    choice2: "pasti ini",
    choice3: "bukan yg ini",
    choice4: "lah",
    answer: 2,
},
{
    question: "sebutkan....",
    choice1: "ini",
    choice2: "pasti ini",
    choice3: "bukan yg ini",
    choice4: "lah",
    answer: 3,
},
{
    question: "siapa yang recal2?",
    choice1: "gibran",
    choice2: "prabowo",
    choice3: "Anis",
    choice4: "Ganjar",
    answer: 2,
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