
const results = {
    nicest: {
        title: "The ‘Nicest’ player out there...",
        tags: ["#IlovePeace", "#AmItooWoke", "#ImJustHappyToBeThere"],
        image: "assets/nicest.png",
        description:
            "You play to have fun, and you want others to have fun too. When things go wrong, you shake it off, lend a hand, and stand up for people who get picked on. Some might call you “too nice,” and some might say that you’re doing it for attention, but a lobby with you in it is a better place to be."
    },
    rage: {
        title: "Rage Quitter",
        tags: ["#YouSuck", "#RageBaited", "#AreWeCooked?"],
        image: "assets/rage.png",
        description:
            "You care about winning, and when things go south, your feelings get loud. Your anger usually isn't about hurting anyone, it just comes out faster than your thoughts do, especially when nobody can see your face. Passion is not a bad thing, but the chat sees your words, not your intentions."
    },
    chaos: {
        title: "Chaos Gameplayer",
        tags: ["#Looooser", "#ChaosIsFun!", "#ItsNeverJustAGame"],
        image: "assets/chaos.png",
        description:
            "For you, a match is a playground, and sometimes the fun is in stirring things up. A joke here, a little sabotage there, and it all feels harmless from your side of the screen. The catch is that the other side might not be laughing, and what’s a prank to you can ruin someone’s whole game."
    },
    keeper: {
        title: "GameKeeper",
        tags: ["#FindMeAMatch", "#WhoAreYou?", "#DontPlayWithMe"],
        image: "assets/keeper.png",
        description:
            "Gaming is a big part of who you are, and you have high standards for who “belongs.” You value skill and commitment, so when someone doesn’t match your standard, it shows. But the line between “high standards” and “pushing people out” is thinner than it looks."
    }
};

const answerTypes = [
    ["nicest", "chaos", "rage", "keeper"],
    ["nicest", "rage", "chaos", "keeper"],
    ["rage", "nicest", "chaos", "keeper"],
    ["chaos", "keeper", "nicest", "rage"],
    ["nicest", "rage", "chaos", "keeper"],
    ["keeper", "nicest", "chaos", "rage"],
    ["nicest", "rage", "chaos", "keeper"]
];

const savedAnswers = JSON.parse(
    sessionStorage.getItem("logbyAnswers") || "null"
);

const resultTitle = document.getElementById("resultTitle");
const resultTags = document.getElementById("resultTags");
const resultImage = document.getElementById("resultImage");
const resultDescription = document.getElementById("resultDescription");

if (!Array.isArray(savedAnswers) || savedAnswers.length !== answerTypes.length ||
    savedAnswers.some((answer) => !Number.isInteger(answer) || answer < 0 || answer > 3)) {
    window.location.replace("index.html");
} else {
    const scores = {
        nicest: 0,
        rage: 0,
        chaos: 0,
        keeper: 0
    };

    savedAnswers.forEach((answer, questionIndex) => {
        const type = answerTypes[questionIndex][answer];
        scores[type]++;
    });

    const highestScore = Math.max(...Object.values(scores));
    const winners = Object.keys(scores).filter(
        (type) => scores[type] === highestScore
    );

    // If tied, use the type from the earliest question
    // where a tied type was selected.
    let winner = winners[0];

    if (winners.length > 1) {
        winner = savedAnswers
            .map((answer, index) => answerTypes[index][answer])
            .find((type) => winners.includes(type));
    }

    const result = results[winner];

    resultTitle.textContent = result.title;
    resultDescription.textContent = result.description;
    resultImage.src = result.image;
    resultImage.alt = result.title;

    result.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.className = "result-tag";
        span.textContent = tag;
        resultTags.appendChild(span);
    });
}

document.getElementById("downloadButton").addEventListener("click", async () => {
    const resultCard = document.getElementById("resultCard");
    const downloadButton = document.getElementById("downloadButton");

    downloadButton.textContent = "Preparing...";
    downloadButton.disabled = true;

    try {
        const canvas = await html2canvas(resultCard, {
            scale: 2,
            backgroundColor: "#6098fa",
            useCORS: true
        });

        const link = document.createElement("a");
        link.download = "Logby-My-Gamer-Type.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    } catch (error) {
        console.error("Download failed:", error);
        alert("Sorry, the image couldn't be downloaded. Please try again.");
    } finally {
        downloadButton.textContent = "Download";
        downloadButton.disabled = false;
    }
});