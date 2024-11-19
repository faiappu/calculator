// Variables
let firstNumber = null;
let operator = null;
let displayNumber = '';
const display = document.querySelector('.display'); 
const numberPressed = document.querySelectorAll('.number');
const operatorPressed = document.querySelectorAll('.operator');
const equalsPressed = document.querySelector('.equals');
const clearPressed = document.querySelector('.clear');

// Default display
display.textContent = '0';

// Functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error'; // Prevent division by zero
    }
    return a / b;
}

function operate(firstNumber, operator, secondNumber) {
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case 'x':
            return multiply(firstNumber, secondNumber);
        case '÷':
            return divide(firstNumber, secondNumber);
        default:
            return null;
    }
}

// Updating display and storing number value
numberPressed.forEach(button => {
    button.addEventListener('click', function() {
        // If the display is '0', replace it with the new number
        if (display.textContent === '0' || displayNumber === '') {
            displayNumber = button.textContent; // Start new number
        } else {
            displayNumber += button.textContent; // Concatenate
        }
        display.textContent = displayNumber; // Update display
    });
});

// Operator pressed
operatorPressed.forEach(button => {
    button.addEventListener('click', function() {
        if (displayNumber !== '') {
            if (firstNumber === null) {
                firstNumber = Number(displayNumber); // Store first number
            } else {
                // Calculate with the previous operator and current number
                firstNumber = operate(firstNumber, operator, Number(displayNumber));
                display.textContent = firstNumber; // Update display with result
            }
            operator = button.textContent; // Store operator
            displayNumber = ''; // Reset for next number
        }
    });
});

// Equals pressed
equalsPressed.addEventListener('click', function() {
    if (firstNumber !== null && operator && displayNumber !== '') {
        const secondNumber = Number(displayNumber);
        const result = operate(firstNumber, operator, secondNumber);
        display.textContent = result; // Update display with result
        // Prepare for the next calculation
        firstNumber = result; // Keep the result for further calculations
        operator = null; // Allow a new operator to be chosen
        displayNumber = ''; // Reset for next input
    }
});

// Clear pressed
clearPressed.addEventListener('click', function() {
    firstNumber = null;
    operator = null;
    displayNumber = '';
    display.textContent = '0'; // Reset display to default
});