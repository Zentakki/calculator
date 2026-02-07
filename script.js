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
    display.value = 0;
    dotBtn.disabled = false;
    buttons.forEach(button => button.classList.remove("selected"));
}

let number1 = "0";
let number2 = "0";
let operator;
let phase = 0;
let history = [];

const html = document.querySelector("html");
const container = document.querySelector(".container");
const display = document.querySelector(".display");
display.readOnly = true;
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
        if (inputStr === "🟰") return;

        if (inputStr === "🔙" && number1 !== "0") {
            number1 = history.pop();
            display.value = number1;
        }
        if (inputStr === "." && number1.includes(".")) {
            // do nothing if . when already a decimal
            return
        };
        if (history[history.length - 2] === ".") {
            // do nothing, limit to only one decimal
            return
        };
        if (inputStr === "." && (number1 === "0")) {
            // this is to allow 0.X
            history.push(number1);
            number1 = "0.";
            display.value = number1;
        } else if (inputStr === "+/-" && number1 !== "0") {
            history.push(number1);
            number1 = number1.split("").includes("-") ? String(Math.abs(Number(number1))) : `-${number1}`;
            display.value = number1;
        } else if (Number(inputStr) || inputStr === "." || inputStr === "0") {
            history.push(number1);
            number1 = number1 ? number1 += inputStr : inputStr;
            number1 = number1.replace(/^0+(?=\d)/, ""); // remove leading 0
            display.value = number1;
        } else if (inputStr in operators) {
            buttons.forEach(button => button.classList.remove("selected"))
            operator = operators[inputStr];
            phase = 1;
            event.target.classList.add("selected");
            history = [];
        };
    };

    if (phase === 1) {
        if (inputStr === "🔙" && number2 !== "0") {
            number2 = history.pop();
            display.value = number2;
        }
        if (inputStr === "." && number2.includes(".")) {
            // do nothing if . when already a decimal
            return
        };
        if (history[history.length - 2] === ".") {
            // do nothing, limit to only one decimal place
            return
        };

        if (inputStr === "." && (number2 === "0")) {
            // this is to allow 0.X
            history.push(number2);
            number2 = "0.";
            display.value = number2;
        } else if (inputStr === "+/-" && number2 !== "0") {
            history.push(number2);
            number2 = number2.split("").includes("-") ? String(Math.abs(Number(number2))) : `-${number2}`;
            display.value = number2;
        } else if (inputStr in operators && number2 === "0" && inputStr !== "🟰") {
            buttons.forEach(button => button.classList.remove("selected"))
            operator = operators[inputStr];
            event.target.classList.add("selected");
        } else if (Number(inputStr) || inputStr === "." || inputStr === "0") {
            history.push(number2);
            number2 = number2 ? number2 += inputStr : inputStr;
            number2 = number2.replace(/^0+(?=\d)/, ""); // remove leading 0
            display.value = number2;
        } else if (inputStr in operators && inputStr !== "🟰") {
            buttons.forEach(button => button.classList.remove("selected"))
            event.target.classList.add("selected");
            const result = operate(
                operator,
                Number(number1),
                Number(number2)
            );
            if (result === Infinity) {
                clear();
                display.value = Infinity;
                return;
            };
            display.value = result;
            // allows to chain operations
            number1 = String(result);
            number2 = "0";
            phase = 1;
            operator = operators[inputStr];
        } else if (inputStr === "🟰") {
            buttons.forEach(button => button.classList.remove("selected"))
            const result = operate(
                operator,
                Number(number1),
                Number(number2)
            );
            if (result === Infinity) {
                clear();
                display.value = Infinity;
                return;
            };
            display.value = result;
            // allows to chain operations
            number1 = String(result);
            number2 = "0";
            operator = "";
            phase = 0;
        };
    };

    // console.log(`number1: ${number1}`);
    // console.log(`operator: ${operator}`);
    // console.log(`number2: ${number2}`);
    // console.log(`inputStr: ${inputStr}`);
    // console.log(`history: ${history}`);
});

// keyboard interaction

html.addEventListener('keypress', (event) => {
    event.preventDefault();
    switch (event.key) {
        case "0":
            document.querySelector("button.zero-btn").click();
            break;
        case "1":
            document.querySelector("button.one").click();
            break;
        case "2":
            document.querySelector("button.two").click();
            break;
        case "3":
            document.querySelector("button.three").click();
            break;
        case "4":
            document.querySelector("button.four").click();
            break;
        case "5":
            document.querySelector("button.five").click();
            break;
        case "6":
            document.querySelector("button.six").click();
            break;
        case "7":
            document.querySelector("button.seven").click();
            break;
        case "8":
            document.querySelector("button.eight").click();
            break;
        case "9":
            document.querySelector("button.nine").click();
            break;
        case "-":
            document.querySelector("button.subtract-btn").click();
            break;
        case "+":
            document.querySelector("button.sum-btn").click();
            break;
        case "*":
            document.querySelector("button.multiply-btn").click();
            break;
        case "/":
            document.querySelector("button.divide-btn").click();
            break;
        case "Enter":
            document.querySelector("button.equal-btn").click();
            break;
    };
})

html.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.key === "Backspace") {
        document.querySelector("button.back").click();
    }});
