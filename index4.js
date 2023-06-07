const questions = [
    {
        question: "Что такое Виртуальная файловая система?",
        optionA: "Физическая система хранения файлов",
        optionB: "Программа для создания файлов",
        optionC: "Интерфейс для работы с разными типами файловых систем",
        optionD: "Архивированная папка с файлами",
        correctOption: "optionC"
    },
    {
        question: "Какие функции выполняет Виртуальная файловая система?",
        optionA: "Создание и удаление файлов",
        optionB: "Чтение и запись данных в файлы",
        optionC: "Управление структурой директорий",
        optionD: "Все перечисленное",
        correctOption: "optionD"
    },
    {
        question: "Какие преимущества имеет использование Виртуальной файловой системы?",
        optionA: "Обеспечение совместимости между различными типами файловых систем",
        optionB: "Упрощение работы с файлами и директориями",
        optionC: "Поддержка сетевых файловых систем",
        optionD: "Все перечисленное",
        correctOption: "optionD"
    },
    {
        question: "Какие типы файловых систем могут поддерживаться Виртуальной файловой системой?",
        optionA: "FAT32",
        optionB: "NTFS",
        optionC: "ext4",
        optionD: "Все перечисленные",
        correctOption: "optionD"
    },
    {
        question: "Какая операционная система использует Виртуальную файловую систему по умолчанию?",
        optionA: "Windows",
        optionB: "Linux",
        optionC: "macOS",
        optionD: "Android",
        correctOption: "optionB"
    },
    {
        question: "Какие операции доступа к файлам предоставляет Виртуальная файловая система?",
        optionA: "Чтение",
        optionB: "Запись",
        optionC: "Удаление",
        optionD: "Все перечисленное",
        correctOption: "optionD"
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
        question: "Какие концепции используются в Виртуальной файловой системе для представления файлов и директорий?",
        optionA: "Дескрипторы",
        optionB: "Узлы индексного дерева (inode)",
        optionC: "Полные пути к файлам",
        optionD: "Блоки данных",
        correctOption: "optionB"
    },
    {
        question: "Что происходит при монтировании файловой системы в Виртуальную файловую систему?",
        optionA: "Файловая система становится доступной для использования",
        optionB: "Создается резервная копия файловой системы",
        optionC: "Файлы и директории находятся в режиме только для чтения",
        optionD: "Операционная система перезагружается",
        correctOption: "optionA"
    },
    {
        question: "Какая команда в командной строке Linux используется для монтирования файловой системы?",
        optionA: "mount",
        optionB: "unmount",
        optionC: "format",
        optionD: "copy",
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