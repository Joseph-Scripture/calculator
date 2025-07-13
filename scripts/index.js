document.addEventListener('DOMContentLoaded', function() {
  
    const display = document.querySelector('.display');
    const digitButtons = document.querySelectorAll('.digit'); 
    const operatorButtons = document.querySelectorAll('.operation'); 
    const equalsButton = document.querySelector('.equal');
    const clearButton = document.querySelector('.clear'); 


    let firstValue = '';
    let currentOperator = '';
    let shouldResetDisplay = false; // A flag to know when to start a new number entry.

// Calculation logic functions
    function add(num1, num2) {
        return num1 + num2;
    }

    function subtract(num1, num2) {
        return num1 - num2;
    }

    function multiply(num1, num2) {
        return num1 * num2;
    }

    function divide(num1, num2) {
        if (num2 === 0) {
            return 'Error: Div by 0';
        }
        return num1 / num2;
    }

    function operate(num1, num2, operator) {
        // Use parseFloat to convert the string values from the display into numbers.
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        
        if (operator === '+') {
            return add(num1, num2);
        } else if (operator === '-') {
            return subtract(num1, num2);
        } else if (operator === '*') {
            return multiply(num1, num2);
        } else if (operator === '/') {
            return divide(num1, num2);
        } else {
            return null;
        }
    }

    // Function to completely reset the calculator's state.
    function resetCalculator() {
        display.textContent = '0';
        firstValue = '';
        currentOperator = '';
        shouldResetDisplay = false;
    }



    // Add a click listener to every single digit button.
    digitButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            if (display.textContent === '0' || shouldResetDisplay) {
                display.textContent = button.textContent;
                shouldResetDisplay = false;
            } else {
                // Otherwise, just add the digit to the end.
                display.textContent += button.textContent;
            }
        });
    });

    // Add a click listener to every operator button.
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            firstValue = display.textContent;
            currentOperator = button.textContent;
            // We set this flag to true so the *next* digit click will clear the display.
            shouldResetDisplay = true;
        });
    });

    // Add a click listener for the equals button.
    equalsButton.addEventListener('click', () => {
        if (!currentOperator || !firstValue) {
            return;
        }
        // The second value is whatever is currently on the display.
        const secondValue = display.textContent;
        const result = operate(firstValue, secondValue, currentOperator);
        
        // Display the result and reset the state for the next calculation.
        display.textContent = result;
        firstValue = '';
        currentOperator = '';
        shouldResetDisplay = true;
    });

    clearButton.addEventListener('click', resetCalculator);


    resetCalculator();
});
