// Dark mode / light mode

const button = document.getElementById("theme_switch");
const navItem = document.querySelector(".nav_item");

// Mobile menu theme button
const mobileTheme = button.cloneNode(true);
mobileTheme.id = "mobile_theme_switch";
navItem.appendChild(mobileTheme);

//hide dropdown
navItem.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navItem.classList.remove("active");
    });
});

// pre-load theme save 
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

// Desktop theme change
button.addEventListener("click", () => {

    if (window.innerWidth <= 768) {
        navItem.classList.toggle("active");
    } else {
        document.body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark") ? "dark" : "light"
        );
    }
});

// Mobile theme button
mobileTheme.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
    navItem.classList.remove("active");
});


// Guess the number game

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;
let gameOver = false;


// Best score save
let bestScore = localStorage.getItem("bestScore");

if (bestScore !== null) {
    bestScore = Number(bestScore);
}


// Enter the guess by Enter button
document.querySelector("#userinput").addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        checkGuess();
    }

});


function checkGuess() {

    const input = document.querySelector("#userinput");
    const display = document.querySelector(".display");

    // Game over no more guess
    if (gameOver) {
        display.textContent = "Game Over! Please start a new game.";
        return;
    }

    const value = input.value;
    const userGuess = Number(value);


    // null attempt not valid
    if (value === "") {
        display.textContent =
            "Please enter a number between 1 and 100.";
        return;
    }


    // only 1-100 valid guess
    if (userGuess < 1 || userGuess > 100) {
        display.textContent =
            "Please enter a number between 1 and 100.";
        return;
    }


    // Valid guess --attempt
    attempts--;


    // right guess
    if (userGuess === randomNumber) {

        const score = 10 - attempts;

        // best score save
        if (bestScore === null || score < bestScore) {

            bestScore = score;

            localStorage.setItem("bestScore", bestScore);
        }

        display.textContent =
            `🎉 Congratulations! You won in ${score} attempts! Best Score: ${bestScore}`;

        gameOver = true;
    }


    // Guessed smaller number
    else if (userGuess < randomNumber) {

        if (attempts === 0) {

            display.textContent =
                `Game Over! 😢 The number was ${randomNumber}`;

            gameOver = true;

        } else {

            display.textContent =
                `Too low! You have ${attempts} attempts left.`;
        }
    }


    // Guessed bigger number
    else {

        if (attempts === 0) {

            display.textContent =
                `Game Over! 😢 The number was ${randomNumber}`;

            gameOver = true;

        } else {

            display.textContent =
                `Too high! You have ${attempts} attempts left.`;
        }
    }

    input.value = "";
}


// reset
function resetGame() {

    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 10;
    gameOver = false;

    document.querySelector("#userinput").value = "";

    document.querySelector(".display").textContent =
        "New game started! Guess a number between 1 and 100.";
}
