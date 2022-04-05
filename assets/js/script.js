const question=document.querySelector('#question');
const choices=Array.from(document.querySelectorAll('.choice-text'));
const progressText=document.querySelector('#progressText');
const scoreText=document.querySelector('#score');
const progressBarFull=document.querySelector('#progressBarFull');

let currentQuestion ={}
let acceptingAnswer = true
let score = 0
let questionCounter= 0
let avaliableQuestions = []

let questions =[
    {
    question:'In Dragon Ball Z, what planet is Goku originally from?',
    choice1: 'Planet Earth',
    choice2: 'Planet Vegeta',
    choice3: 'Planet Namek',
    choice4: 'Planet Sayian',
    answer: 2,
    },
    {
        question:'What animal can a sayain transform into?',
        choice1: 'A Lion',
        choice2: 'A Dragon',
        choice3: 'A Bull',
        choice4: 'A Monkey',
        answer: 4,
        },
        {
            question:'How many Dragon Balls are there?',
            choice1: 'Seven',
            choice2: 'Two',
            choice3: 'Five',
            choice4: 'Six',
            answer: 1,
            },

            {
                question:'Of Dr. Geros Andriods, which was the strongest?',
                choice1: 'Cell',
                choice2: 'Andriod 16',
                choice3: 'Andriod 18',
                choice4: 'Andriod 17',
                answer: 1,
                },
                {
                    question:'What villian was stunned to see Gokus transformation into a Super Sayian?',
                    choice1: 'Cell',
                    choice2: 'Buu',
                    choice3: 'Vegeta',
                    choice4: 'Freiza',
                    answer: 4,
                    },
                    {
                        question:'What is the name of the bean that replenishes a Z fighters health?',
                        choice1: 'Pinto Bean',
                        choice2: 'Senzu Bean',
                        choice3: 'Baked Bean',
                        choice4: 'Health Bean',
                        answer: 2,
                        },
                        {
                            question:'In Dragon Ball Z, what character travels from the future to warn the Z fighters of the andriods?',
                            choice1: 'Trunks',
                            choice2: 'Goten',
                            choice3: 'Gohan',
                            choice4: 'Pan',
                            answer: 1,
                            },
                            {
                                question:'What is Gokus given name?',
                                choice1: 'Bardok',
                                choice2: 'Broli',
                                choice3: 'Kakarot',
                                choice4: 'Raditz',
                                answer: 3,
                                },
                                {
                                    question:'What special feautre gave sayains an extrodinary power?',
                                    choice1: 'Their Hair',
                                    choice2: 'Their Legs',
                                    choice3: 'Their Tail',
                                    choice4: 'Their Wings',
                                    answer: 3,
                                    },
                                    {
                                        question:'Who Killed Gokus brother Raditz?',
                                        choice1: 'Nail',
                                        choice2: 'Kami',
                                        choice3: 'Napa',
                                        choice4: 'Picolo',
                                        answer: 4,
                                        },

            
]

const SCORE_POINTS = 1200
const MAX_QUESTIONS = 10

startGame =()=>{
    questionCounter= 0
    score=0
    availableQuestions =[...questions]
    getNewQuestion()
}

getNewQuestion =() =>{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText =`Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width= `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random()* availableQuestions.length)
    currentQuestion = availableQuestions [questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach (choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex,1)

    acceptingAnswers = true
    }

    choices.forEach(choice => {
        choice.addEventListener('click', e =>{
            if(!acceptingAnswers)return

            acceptingAnswers = false
            const selectedChoice = e.target
            const selectedAnswer = selectedChoice.dataset['number']

            let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
            'incorrect'

            if(classToApply === 'correct'){
                incrementScore(SCORE_POINTS)
            }

            selectedChoice.parentElement.classList.add(classToApply)

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()
            },2000)
        })
    })

    incrementScore = num => {
        score +=num
        scoreText.innerText =score
    }

    startGame()

