const questions = [
    {
        question: "Что такое планировщик в операционной системе?",
        optionA: "Программа для создания расписания задач",
        optionB: "Часть графического интерфейса ОС",
        optionC: "Система безопасности",
        optionD: "Браузер по умолчанию",
        correctOption: "optionA"
    },
    {
        question: "Какие задачи выполняет планировщик операционной системы?",
        optionA: "Управление памятью",
        optionB: "Управление процессами",
        optionC: "Управление файловой системой",
        optionD: "Управление сетевыми устройствами",
        correctOption: "optionB"
    },
    {
        question: "Какие алгоритмы планирования процессов существуют?",
        optionA: " FIFO, LIFO, SJF",
        optionB: "TCP, UDP, IP",
        optionC: "HTTP, FTP, SMTP",
        optionD: "RAM, ROM, HDD",
        correctOption: "optionA"
    },
    {
        question: "Что такое приоритет процесса в планировщике?",
        optionA: "Количество потоков выполнения процесса",
        optionB: "Время, необходимое для выполнения процесса",
        optionC: "Важность процесса относительно других",
        optionD: "Размер используемой памяти процесса",
        correctOption: "optionC"
    },
    {
        question: "Какие факторы могут влиять на выбор алгоритма планирования в ОС?",
        optionA: "Количество процессоров",
        optionB: "Приоритет процессов",
        optionC: "Загруженность системы",
        optionD: "Все перечисленное",
        correctOption: "optionD"
    },
    {
        question: "Что такое квант времени (time slice)?",
        optionA: "Интервал времени, выделенный процессу для выполнения на процессоре",
        optionB: "Размер оперативной памяти, выделенной процессу",
        optionC: "Время, затрачиваемое на загрузку операционной системы",
        optionD: "Периодичность планирования процессов в ОС",
        correctOption: "optionA"
    },
    {
        question: "Какие стратегии планирования могут использоваться для многопроцессорных систем?",
        optionA: "Планирование на основе приоритетов",
        optionB: " Раунд-робин планирование",
        optionC: "Планирование с вытеснением",
        optionD: "Все перечисленное",
        correctOption: "optionD"
    },
    {
        question: "Что такое инвертированный приоритет в планировщике?",
        optionA: "Процесс с наивысшим приоритетом получает больше времени процессора",
        optionB: "Процесс с наименьшим приоритетом получает больше времени процессора",
        optionC: "Процесс с наибольшей загрузкой получает больше времени процессора",
        optionD: "Процесс с наименьшей загрузкой получает больше времени процессора",
        correctOption: "optionB"
    },
    {
        question: "Какие методы планирования используются в реальном времени операционных системах?",
        optionA: "FIFO, LIFO, SJF",
        optionB: "Приоритетное планирование",
        optionC: "Раунд-робин планирование",
        optionD: " Все перечисленное",
        correctOption: "optionD"
    },
    {
        question: "Что такое задержка (latency) в контексте планировщика?",
        optionA: "Время, требуемое для переключения между процессами",
        optionB: "Время, требуемое для загрузки операционной системы",
        optionC: "Время, требуемое для выполнения задачи",
        optionD: "Время, требуемое для завершения процесса",
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