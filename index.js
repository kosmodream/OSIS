const questions = [
    {
        question: "Операционная система – это:",
        optionA: "прикладная программа;",
        optionB: "системная программа;",
        optionC: "система программирования;",
        optionD: "текстовый редактор.",
        correctOption: "optionB"
    },
    {
        question: "Драйвер – это:",
        optionA: "устройство компьютера;",
        optionB: "программа для работы с устройствами компьютера;",
        optionC: "прикладная программа;",
        optionD: "язык программирования.",
        correctOption: "optionB"
    },
    {
        question: "Программа, работающая под управлением Windows, называется:",
        optionA: "приложение;",
        optionB: "документ;",
        optionC: "среда;",
        optionD: "как-то иначе.",
        correctOption: "optionA"
    },
    {
        question: "Операционную систему с диска загружает в ОЗУ:",
        optionA: "BIOS;",
        optionB: "драйвер;",
        optionC: "загрузчик операционной системы;",
        optionD: "сервисная программа.",
        correctOption: "optionC"
    },
    {
        question: "Свойствами Рабочего стола является:",
        optionA: "оформление Рабочего стола;",
        optionB: "ярлыки, папки, файлы, расположенные на Рабочем столе;",
        optionC: "дата изготовления Рабочего стола;",
        optionD: "имя пользователя, работающего с Рабочим столом.",
        correctOption: "optionA"
    },
    {
        question: "На панели задач находятся:",
        optionA: "кнопки свернутых программ;",
        optionB: "только ярлыки;",
        optionC: "кнопка Пуск;",
        optionD: "кнопка Пуск и значки свернутых и работающих программ.",
        correctOption: "optionD"
    },
    {
        question: "Активизировать или выделить файл или папку можно:",
        optionA: "двойным щелчком мыши;",
        optionB: "щелчком;",
        optionC: "протаскиванием;",
        optionD: "указыванием.",
        correctOption: "optionB"
    },
    {
        question: "Главное меню открывается:",
        optionA: "щелчком по значку Мой компьютер;",
        optionB: "кнопкой Пуск;",
        optionC: "контекстным меню;",
        optionD: "щелчком на Панели задач.",
        correctOption: "optionB"
    },
    {
        question: "Окно – это:",
        optionA: "рабочая область;",
        optionB: "основное средство общения с Windows;",
        optionC: "приложение Windows;",
        optionD: "событие Windows.",
        correctOption: "optionB"
    },
    {
        question: ` Где расположена строка меню окна:`,
        optionA: "сверху;",
        optionB: "снизу;",
        optionC: "слева;",
        optionD: "справа.",
        correctOption: "optionA"
    },
]
let shuffledQuestions = []
function handleQuestions() { 
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}
let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0 
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}
function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null
    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}
function handleEndGame() {
    let remark = null
    let remarkColor = null
    if (playerScore <= 3) {
        remark = "Плохие оценки, продолжай практиковаться."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Средние оценки, ты можешь добиться большего."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Отлично, продолжайте в том же духе."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"
}
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}