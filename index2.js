const questions = [
    {
        question: "Что такое ядро операционной системы?",
        optionA: "Главная программа в ОС",
        optionB: "Часть пользовательского интерфейса",
        optionC: "Встроенная система безопасности",
        optionD: "Браузер по умолчанию",
        correctOption: "optionA"
    },
    {
        question: "Какие компоненты входят в пользовательское пространство операционной системы?",
        optionA: "Ядро и драйверы",
        optionB: "Программы и файловая система",
        optionC: "Виртуальная машина и базы данных",
        optionD: "Подключенные устройства и сеть",
        correctOption: "optionB"
    },
    {
        question: "Что такое процессы в операционной системе?",
        optionA: "Пользовательские файлы",
        optionB: "Программы, выполняющиеся на компьютере",
        optionC: "Внешние устройства",
        optionD: "Файловая система",
        correctOption: "optionB"
    },
    {
        question: "Что такое потоки выполнения (threads)?",
        optionA: "Графический интерфейс ОС",
        optionB: "Маленькие задачи, выполняющиеся внутри процессов",
        optionC: "Файловые дескрипторы",
        optionD: "Разделы на жестком диске",
        correctOption: "optionB"
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
        question: "Какая операционная система является серверной?",
        optionA: "Windows",
        optionB: "macOS",
        optionC: "Linux",
        optionD: "Android",
        correctOption: "optionC"
    },
    {
        question: "Что такое файловая система?",
        optionA: "Способ организации файлов на диске",
        optionB: "Операционная система для мобильных устройств",
        optionC: "Сетевой протокол",
        optionD: "Программа для создания архивов",
        correctOption: "optionA"
    },
    {
        question: "Что такое драйвер устройства?",
        optionA: "Программа для управления аппаратными устройствами",
        optionB: "Встроенный браузер ОС",
        optionC: "Системный администратор",
        optionD: "Резервное копирование данных",
        correctOption: "optionA"
    },
    {
        question: "Как операционная система обеспечивает безопасность и контролирует доступ к ресурсам?",
        optionA: "Шифрование данных",
        optionB: "Автоматическое обновление программ",
        optionC: "Межсетевой экран (Firewall)",
        optionD: "Механизмы аутентификации и авторизации",
        correctOption: "optionD"
    },
    {
        question: "Что такое виртуальная машина (Virtual Machine) в операционной системе?",
        optionA: "Программа для эмуляции аппаратного обеспечения",
        optionB: "Встроенный текстовый редактор",
        optionC: "Система автоматического резервного копирования",
        optionD: "Мониторинговая панель для ресурсов компьютера",
        correctOption: "optionD"
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