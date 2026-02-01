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

//

let number1 = 4;
let number2 = 2;
let operator = "+";

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
    return result
}

console.log(operate(operator, number1, number2))