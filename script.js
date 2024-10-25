let userName = '';
let currentQuestion = 0;
let score = 0;
const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: 0
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        correctAnswer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "South Africa", "Australia", "Brazil"],
        correctAnswer: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: 1
    },
    {
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: 2
    },
    {
        question: "What is the main ingredient in guacamole?",
        options: ["Tomato", "Avocado", "Onion", "Lemon"],
        correctAnswer: 1
    }
];

function startQuiz() {
    userName = document.getElementById('user-name').value;
    if (userName.trim() === '') {
        alert('Please enter your name');
        return;
    }
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-number').textContent = currentQuestion + 1;
    document.getElementById('question-text').textContent = question.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
    document.getElementById('next-btn').disabled = true;
}

function selectOption(index) {
    const buttons = document.querySelectorAll('#options button');
    buttons.forEach(button => button.classList.remove('selected'));
    buttons[index].classList.add('selected');
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    const selectedButton = document.querySelector('#options button.selected');
    if (selectedButton) {
        const selectedAnswer = Array.from(selectedButton.parentNode.children).indexOf(selectedButton);
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            score++;
        }
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';
    document.getElementById('result-score').textContent = score+"/10";
    let comment = '';
    if (score <= 3) {
        comment = userName + ", You might want to brush up on your general knowledge.";
    } else if (score <= 6) {
        comment = "Not bad " + userName + "! There's room for improvement.";
    } else if (score <= 9) {
        comment = "Great job " + userName + "! You have a good grasp of general knowledge.";
    } else {
        comment = "Perfect score " + userName + "! You're a general knowledge expert!";
    }
    document.getElementById('result-comment').textContent = comment;
}
