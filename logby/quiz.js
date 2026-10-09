
const playerGreeting = document.getElementById("playerGreeting");
const questionProgress = document.getElementById("questionProgress");
const questionTitle = document.getElementById("questionTitle");
const answerList = document.getElementById("answerList");
const answerError = document.getElementById("answerError");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");

const playerName = sessionStorage.getItem("logbyPlayerName");

if (!playerName) {
    window.location.replace("index.html");
} else {
    playerGreeting.textContent = playerName;
}

// Question data
const questions = [
    {
        question:
            "Oh, no! Your team just lost in a ranked match. How would you react?",
        answers: [
            "“It’s okay, we’ll win next time. It’s just a game anyway.”",
            "Spam laughing emoji in the chat",
            "Send a chat: “You guys suck. Never play again”",
            "“This is why noob shouldn't play”"
        ]
    },
    {
        question:
            "Your friend just started playing the game and barely knows how it works. They invite you to play together. What do you do?",
        answers: [
            "“Sounds fun! But, let me teach you the basics first”",
            "“Okay...” but you get annoyed when they make a mistake",
            "“Okay!” then purposely mess up their game just for laughs",
            "“You don’t have the skill. Just quit the game lol”"
        ]
    },
    {
        question:
            "You make a new account. Nobody knows about it. You stayed anonymous.",
        answers: [
            "“Finally, i can let my anger out freely lol”",
            "Nothing changes, you stay as who you are.",
            "Pretend to be a newbie and purposely ruin the game",
            "Now I can tell players to quit, and nobody will know it’s me"
        ]
    },
    {
        question:
            "Your friend makes a mistake during a match, and your team loses because of it.",
        answers: [
            "“OMG you’re the MVP... of losers, i meant LOLL”",
            "Stop playing. You can’t play anyway",
            "It’s okay, it happens",
            "Spam the chats with curse words"
        ]
    },
    {
        question:
            "You notice one player is being repeatedly mocked in the lobby",
        answers: [
            "Stand up for them and report the players mocking them",
            "You’re the one who mock them....",
            "Join in on the mocking just for laughs and FOMO",
            "Mute the chat and keep playing like nothing happened"
        ]
    },
    {
        question:
            "Someone says that you’re too rude in the chats and report you",
        answers: [
            "“OMG, are you a child? Can’t handle a comment?”",
            "Apologize for being rude",
            "“Whatever. I can still play anyway”",
            "Get defensive: “They started it!” and keep ranting in chat"
        ]
    },
    {
        question:
            "You experienced lose streak, you usually...",
        answers: [
            "Take a break and chat with friends",
            "Stay mad for hours",
            "Look for a target to troll",
            "Think about whose fault it is"
        ]
    }
];


const answerTypes = [
    ["nicest", "chaos", "rage", "keeper"], // Q1: A, B, C, D
    ["nicest", "rage", "chaos", "keeper"], // Q2
    ["rage", "nicest", "chaos", "keeper"], // Q3
    ["chaos", "keeper", "nicest", "rage"], // Q4
    ["nicest", "rage", "chaos", "keeper"], // Q5
    ["keeper", "nicest", "chaos", "rage"], // Q6
    ["nicest", "rage", "chaos", "keeper"]  // Q7
];

let currentQuestion = 0;
const selectedAnswers = Array(questions.length).fill(null);

function renderQuestion() {
    const question = questions[currentQuestion];

    questionProgress.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionTitle.textContent = question.question;
    answerList.innerHTML = "";
    answerError.textContent = "";

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "answer-button";
        button.textContent = answer;

        button.setAttribute("aria-pressed", "false");

        if (selectedAnswers[currentQuestion] === index) {
            button.classList.add("selected");
            button.setAttribute("aria-pressed", "true");
        }

        button.addEventListener("click", () => {
            selectedAnswers[currentQuestion] = index;

            answerList.querySelectorAll(".answer-button").forEach((item) => {
                item.classList.remove("selected");
                item.setAttribute("aria-pressed", "false");
            });

            button.classList.add("selected");
            button.setAttribute("aria-pressed", "true");
            answerError.textContent = "";
        });

        answerList.appendChild(button);
    });

    backButton.disabled = currentQuestion === 0;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "I’m done. Who am I?"
            : "Next questions";
}

backButton.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
});

nextButton.addEventListener("click", () => {
    if (selectedAnswers[currentQuestion] === null) {
        answerError.textContent = "Please select an answer first!";
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        sessionStorage.setItem(
            "logbyAnswers",
            JSON.stringify(selectedAnswers)
        );

        window.location.href = "result.html";
    }
});

if (playerName) {
    renderQuestion();
}
