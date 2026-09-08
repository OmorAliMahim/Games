//Dark mode Light mode

const button = document.getElementById("theme_switch");
const navItem = document.querySelector(".nav_item");

const mobileTheme = button.cloneNode(true);
mobileTheme.id = "mobile_theme_switch";
navItem.appendChild(mobileTheme);


// Page load saved theme check
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}


// Desktop theme button
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

});

// A game there a have to gase a number between 1 to 100 and the user have to guess the number and if the user guess the number correctly then the user will win otherwise the user will lose.

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;
let bestScore = localStorage.getItem("bestScore");

if (bestScore !== null) {
    bestScore = Number(bestScore);
}


document.querySelector("#userinput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkGuess();
    }
});

function checkGuess() {
    const userGuess = Number(document.querySelector("#userinput").value);

    if (userGuess < 1 || userGuess > 100) {
        document.querySelector(".display").textContent = "Please enter a number between 1 and 100.";
        return;
    }

    if (userGuess === Number) {
        document.querySelector(".display").textContent = "Please enter numbers only"
    }

    attempts--;

    if (userGuess === randomNumber) {
        const score = 10 - attempts + 1;

        if (bestScore === null || score < bestScore) {
            bestScore = score;
            localStorage.setItem("bestScore", bestScore);
        }
        document.querySelector(".display").textContent = `Congratulations! You won in ${score} attempts! Best Score: ${bestScore}`;
    }
    else if (userGuess < randomNumber) {
        document.querySelector(".display").textContent = `Too low! You have ${attempts} attempts left.`;
    }
    else {
        document.querySelector(".display").textContent = `Too high! You have ${attempts} attempts left.`;
    }

    if (attempts === 0 && userGuess !== randomNumber) {
        document.querySelector(".display").textContent = `Game Over! The number was ${randomNumber}`;
    }

    document.querySelector("#userinput").value = "";
}
