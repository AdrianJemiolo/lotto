function getRandom(max) {
    return Math.floor(Math.random() * max) + 1;
}

const container = document.querySelector("#container");
const div = document.querySelectorAll("div.field");
const btn = document.querySelector("#btn");
const drawnNumbers = document.querySelector("#drawnNumbers");
const selectedNumbers = document.querySelector("#selectedNumbers");
const matchedNumbers = document.querySelector("#matchedNumbers");
let limit = 6;
let drawn = [];
let selected = [];
let matched = [];

document.addEventListener("DOMContentLoaded", function() {
    for (let i = 1; i <= 49; i++) {
        const divElement = document.createElement("div");
        divElement.className = "field";
        divElement.setAttribute("value", i);
        divElement.textContent = i;
        container.appendChild(divElement);
        divElement.addEventListener("click", changeColor);
    }
});

function changeColor() {
    if (selected.length < limit || this.classList.contains("selected")) {
        this.classList.toggle("selected");
        selected = [];
        document.querySelectorAll("div.field.selected").forEach((e) => selected.push(e.textContent));
        num = selected.length;
    } else {
        alert("You can select maximum 6 fields");
    }
    if (num === limit) {
        btn.addEventListener("click", drawAgain);
    } else {
        btn.removeEventListener("click", drawAgain);
    }
}

for (let i = 0; i < div.length; i++) {
    div[i].addEventListener("click", changeColor);
}

function drawAgain() {
    if (selected.length !== limit) {
        alert("Please select exactly 6 fields.");
        return;
    }
    reset();
    drawNumbers();
    showSelectedNumbers();
    checkMatches();
    showResults();
    unselectNumbers();
}

function reset() {
    drawnNumbers.innerHTML = "";
    selectedNumbers.innerHTML = "";
    matchedNumbers.innerHTML = "";
    drawn = [];
    matched = [];
}

function drawNumbers() {
    drawnNumbers.innerHTML = "<h1>Drawn Numbers: </h1>";
    for (let i = 0; i < limit; i++) {
        let randomNum;
        do {
            randomNum = getRandom(49);
        } while (drawn.includes(randomNum));
        drawn.push(randomNum);

        const newDiv = document.createElement("div");
        newDiv.value = randomNum;
        newDiv.textContent = randomNum;
        newDiv.classList.add("special");
        newDiv.classList.add("field");
        drawnNumbers.appendChild(newDiv);
    }
}

function showSelectedNumbers() {
    selectedNumbers.innerHTML = "<h1>Selected Numbers: </h1>";
    selected = [];
    const divElements = document.querySelectorAll('div.field');
    for (let i = 0; i < divElements.length; i++) {
        if (divElements[i].classList.contains("selected")) {
            const divElement = document.createElement("div");
            divElement.value = divElements[i].textContent;
            divElement.textContent = divElements[i].textContent;
            divElement.classList.add("special");
            divElement.classList.add("field");
            selectedNumbers.appendChild(divElement);
            selected.push(divElements[i].textContent);
        }
    }
}

function unselectNumbers() {
    selected = [];
    const divElements = document.querySelectorAll("div.field");
    for (let i = 0; i < divElements.length; i++) {
        divElements[i].classList.remove("selected");
    }
}

function checkMatches() {
    matched = [];
    for (let i = 0; i < selected.length; i++) {
        for (let j = 0; j < drawn.length; j++) {
            if (parseInt(selected[i]) === drawn[j]) {
                matched.push(selected[i]);
            }
        }
    }
}

function showResults() {
    matchedNumbers.innerHTML = "<h1>Matched Numbers: </h1>";
    for (let i = 0; i < matched.length; i++) {
        const matchedDiv = document.createElement("div");
        matchedDiv.textContent = matched[i];
        matchedDiv.classList.add("special");
        matchedDiv.classList.add("field");
        matchedNumbers.appendChild(matchedDiv);
    }
    if (matched.length === 0) {
        matchedNumbers.classList.add("loss");
        matchedNumbers.innerHTML += "No luck this time.";
    } else {
        matchedNumbers.classList.remove("loss");
    }
}

btn.addEventListener("click", drawAgain);