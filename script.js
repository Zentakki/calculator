// calculator operations

const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(a, b) {
	return a * b;
};

const divide = function(a, b) {
    return b === 0 ? Infinity : a / b;
}

const operators = {
    "➗": "/",
    "✖️": "*",
    "➕": "+",
    "➖": "-",
    "🟰": "=",
}

function operate(op, x, y) {
    let result;
    switch (op) {
        case '+':
            result = add(x, y);
            break;
        case '-':
            result = subtract(x, y);
            break;
        case '*':
            result = multiply(x, y);
            break;
        case '/':
            result = divide(x, y);
            break;
    }
    return Math.round(result * 100) / 100
}

const clear = () => {
    number1 = "0";
    number2 = "0";
    operator = undefined;
    phase = 0;
    history = [];
    currentInput = undefined;
    lastInput = undefined;
    display.value = 0;
    dotBtn.disabled = false;
    buttons.forEach(button => button.classList.remove("selected"));
}

let number1 = "0";
let number2 = "0";
let operator;
let phase = 0;
let history = [];
let currentInput = undefined;
let lastInput = undefined;

const container = document.querySelector(".container");
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const dotBtn = document.querySelector(".dot-btn");
container.addEventListener('click', (event) => {
    // This is to avoid issue when clicking on the container
    if (event.target.localName != "button") return;

    inputStr = event.target.textContent;
    if (inputStr === 'AC') {
        clear();
    };

    if (phase === 0) {
        if (inputStr === "." && number1.includes(".")) {
            // do nothing
            return
        };
        if (history[history.length - 2] === ".") {
            // do nothing, limit to only one decimal
            return
        };
        if (inputStr === "." && (number1 === "0" || number1 === "-")) {
            // this is to allow 0.X and -0.X
            currentInput = inputStr;
            number1 = "-" ? number1 = "-0." : "0.";
            display.value = number1;
            lastInput = inputStr;
            history.push(lastInput);
        } else if (inputStr === "➖" && lastInput === undefined) {
            // input a negative number
            currentInput = "-";
            number1 = currentInput;
            lastInput = inputStr;
            history.push(lastInput);
        } else if (Number(inputStr) || inputStr === "." || inputStr === "0") {
            currentInput = inputStr;
            number1 = number1 ? number1 += currentInput : currentInput;
            number1 = number1.replace(/^0+(?=\d)/, ""); // remove leading 0
            display.value = number1;
            lastInput = inputStr;
            history.push(lastInput);
        } else if (inputStr in operators) {
            buttons.forEach(button => button.classList.remove("selected"))
            operator = operators[inputStr];
            phase = 1;
            event.target.classList.add("selected");
            lastInput = inputStr;
            history = [];
        };
    };

    if (phase === 1) {
        if (inputStr === "." && number2.includes(".")) {
            // do nothing
            return
        };
        if (history[history.length - 2] === ".") {
            // do nothing, limit to only one decimal
            return
        };

        if (inputStr === "." && (number2 === "0" || number2 === "-")) {
            // this is to allow 0.X and -0.X
            currentInput = inputStr;
            number2 = "-" ? number2 = "-0." : "0.";
            display.value = number2;
            lastInput = inputStr;
            history.push(lastInput);
        } else if (inputStr === "➖" && lastInput === "➖" && number2 === "0") {
            // input a negative number
            currentInput = "-";
            number2 = currentInput;
            lastInput = inputStr;
            history.push(lastInput);
        } else if (inputStr in operators && number2 === "0") {
            buttons.forEach(button => button.classList.remove("selected"))
            operator = operators[inputStr];
            event.target.classList.add("selected");
            lastInput = inputStr;
            history.push(lastInput);
        } else if (Number(inputStr) || inputStr === "." || inputStr === "0") {
            currentInput = inputStr;
            number2 = number2 ? number2 += currentInput : currentInput;
            number2 = number2.replace(/^0+(?=\d)/, ""); // remove leading 0
            display.value = number2;
            lastInput = inputStr;
            history.push(lastInput);
        } else if (inputStr === "🟰") {
            buttons.forEach(button => button.classList.remove("selected"))
            const result = operate(
                operator,
                Number(number1),
                Number(number2)
            );
            display.value = result;
            // allows to chain operations
            number1 = result;
            number2 = "0";
            operator = "";
            phase = 0;
        };
    };

    // console.log(`number1: ${number1}`);
    // console.log(`operator: ${operator}`);
    // console.log(`number2: ${number2}`);
    // console.log(`inputStr: ${inputStr}`);
    // console.log(`lastInput: ${lastInput}`);
    // console.log(`history: ${history}`);
})
