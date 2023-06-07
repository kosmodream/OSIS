const questions = [
    {
        question: "Что такое IP-адрес?",
        optionA: "Уникальный идентификатор устройства в сети",
        optionB: "Веб-сайт или доменное имя",
        optionC: "Пароль для доступа к сети",
        optionD: "Протокол передачи данных",
        correctOption: "optionA"
    },
    {
        question: "Что обеспечивает протокол TCP?",
        optionA: "Надежную доставку пакетов данных",
        optionB: "Адресацию узлов в сети",
        optionC: "Шифрование передаваемых данных",
        optionD: "Разделение сетевых ресурсов",
        correctOption: "optionA"
    },
    {
        question: "Что такое DNS?",
        optionA: "Протокол безопасной передачи данных",
        optionB: "Сервер для хранения файлов",
        optionC: "Система доменных имен",
        optionD: "Протокол маршрутизации",
        correctOption: "optionC"
    },
    {
        question: "Какой протокол используется для безопасной передачи данных в сети?",
        optionA: "HTTP",
        optionB: "FTP",
        optionC: "HTTPS",
        optionD: "SMTP",
        correctOption: "optionC"
    },
    {
        question: "Что такое маршрутизатор?",
        optionA: "Программа для анализа сетевого трафика",
        optionB: "Устройство для передачи данных между сетями",
        optionC: "Сервер для хранения файлов",
        optionD: "Устройство для соединения компьютеров в локальной сети",
        correctOption: "optionB"
    },
    {
        question: "Что такое маска подсети?",
        optionA: "Идентификатор сетевого устройства",
        optionB: "Уникальный идентификатор сети",
        optionC: "Код, определяющий размер сети и адресную часть IP-адреса",
        optionD: "Уникальное имя хоста",
        correctOption: "optionC"
    },
    {
        question: "Какие протоколы могут использоваться для работы с сетевыми файловыми системами через Виртуальную файловую систему?",
        optionA: "FTP",
        optionB: "NFS",
        optionC: "SFTP",
        optionD: "Все перечисленные",
        correctOption: "optionD"
    },
    {
        question: "Какой протокол используется для получения электронной почты?",
        optionA: "HTTP",
        optionB: "FTP",
        optionC: "SMTP",
        optionD: "IP",
        correctOption: "optionC"
    },
    {
        question: "Что такое NAT?",
        optionA: "Протокол для передачи данных по сети",
        optionB: "Сервис для блокировки нежелательных сайтов",
        optionC: "Метод преобразования IP-адресов",
        optionD: "Сервис для хранения файлов в сети",
        correctOption: "optionC"
    },
    {
        question: "Какой протокол используется для удаленного доступа к компьютеру?",
        optionA: "FTP",
        optionB: "HTTP",
        optionC: "RDP",
        optionD: "DNS",
        correctOption: "optionC"
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