const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const equalsButton = document.querySelector('[data-equals]');
const preivousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator{

    constructor(preivousOperandTextElement, currentOperandTextElement) {
        this.preivousOperandTextElement = preivousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.preivousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number.toString() == ".") {
            if(!(this.currentOperand.includes("."))) {
            this.currentOperand += number;
            }
        } else {
            this.currentOperand += number;
        }
    }


    chooseOperation(operation){
        if (this.currentOperand === "")
        return
        if (this.preivousOperand !== "") {
            this.compute()
        } 
        this.operation = operation;
        this.preivousOperand = this.currentOperand;
        this.currentOperand = '';

        this.preivousOperand = this.preivousOperand + " " + operation;
    }

    compute() {
        let computation
        const prev = parseFloat(this.preivousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "×":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.preivousOperand = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerHTML = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null) {
            this.preivousOperandTextElement.innerHTML = this.getDisplayNumber(this.preivousOperand).concat(" ").concat(this.operation);
        } else {
            this.preivousOperandTextElement.innerHTML = "";
        }
    }

    getDisplayNumber(number) {
        const numberFloat = parseFloat(number);
        if (isNaN(numberFloat)) return ""
        return numberFloat.toLocaleString("en");
    }

}


const calculator = new Calculator(preivousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerHTML);
        calculator.updateDisplay();
    })
})

clearButton.addEventListener("click", button => {
        calculator.clear();
        calculator.updateDisplay();
})

equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
})