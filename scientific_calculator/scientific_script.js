const input = document.querySelector("#calculator-input");

let displayValue = "0";
let leftValue = null;
let operator = null;
let isNewInput = true;

function updateDisplay() {
  input.value = displayValue;
}

function insertNumber(num) {
  if (isNewInput || displayValue === "0") {
    displayValue = num;
    isNewInput = false;
  } else {
    displayValue += num;
  }
  updateDisplay();
}

function insertDot() {
  if (isNewInput) {
    displayValue = "0.";
    isNewInput = false;
  } else if (!displayValue.includes(".")) {
    displayValue += ".";
  }
  updateDisplay();
}

function insertOperator(symbol) {
  let op;
	
	if (symbol === "÷") {
		op = "/";
	} else if (symbol === "x" || symbol === "X") {
		op = "*";
	} else {
		op = symbol;
	}

  if (operator && !isNewInput) {
    displayValue = calculate(leftValue, displayValue, operator);
  }

  leftValue = displayValue;
  operator = op;
  isNewInput = true;
  updateDisplay();
}

function insertEqual() {
  if (!operator || leftValue === null) return;

  displayValue = calculate(leftValue, displayValue, operator);
  leftValue = null;
  operator = null;
  isNewInput = true;
  updateDisplay();
}

function insertFunction(fn) {
  if (fn === "AC") {
    displayValue = "0";
    leftValue = null;
    operator = null;
    isNewInput = true;
  } else if (fn === "+/-") {
    if (displayValue !== "0") {
      displayValue = displayValue.startsWith("-")
        ? displayValue.slice(1)
        : "-" + displayValue;
    }
  } else if (fn === "%") {
    displayValue = (parseFloat(displayValue) / 100).toString();
  }
  updateDisplay();
}

function insertSci(fn) {
	const	value = displayValue;
	const result = calculateSci(fn, value);
	
	displayValue = result;
	isNewInput = true;
	updateDisplay();
}

function calculate(numA, numB, op) {
  const a = parseFloat(numA);
  const b = parseFloat(numB);

  switch (op) {
    case "+":
      return (a + b).toString();
    case "-":
      return (a - b).toString();
    case "*":
      return (a * b).toString();
    case "/":
      if (b === 0) return "Error";
      return (a / b).toString();
    default:
      return numB;
  }
}

//
function calculateSci(sci, numA) {

	if (sci === "pi") {
    return Math.PI.toString();
  }
  if (sci === "e") {
    return Math.E.toString();
  }
	const a = parseFloat(numA);
	let result;

	if (Number.isNaN(a)){
    return "Invalid number";
  }

  switch (sci) {
		case "sin":
      result = Math.sin(a);
			break;
		case "cos":
      result = Math.cos(a);
			break;
		case "tan":
      result = Math.tan(a);
			break;
		case "sinh":
      result =  Math.sinh(a);
			break;
    case "cosh":
      result = Math.cosh(a);
			break;
    case "tanh":
      result =  Math.tanh(a);
			break;
		case "exp":
      result = Math.exp(a);
			break;
    case "ln":
      result = Math.log(a); 
			break;  
    case "log10":
      result = Math.log10(a);
			break;
    case "pow2":
      result = Math.pow(a, 2);
			break;
    case "pow3":
      result = Math.pow(a, 3);
			break;
    case "pow10":
      result = Math.pow(10, a);
			break;

		case "sqrt":
			if (a < 0) 
				return "Can't tale Squre root of negative number";
      result = Math.sqrt(a);
			break;

    case "fact": {
      if (!Number.isInteger(a) || a < 0) {
        return "Factorial only for positive integers";
      }
      let res = 1;
      for (let i = 2; i <= a; i++) 
				res *= i;
      result = res;
			break;
    }
    default:
      return "Invalid operator";
  }
	return result.toString();
}


// It's winter time :)
const NUM_FLAKES = 80;

const rand = (min, max) => Math.random() * (max - min) + min;

function generateFakeSnow() {

  const flake = document.createElement("div");

	const randomDepth = Math.floor(rand(0, 3));
	const depthClass = 
		randomDepth === 0
		? 'snowflake-close'
		: randomDepth === 1 
		? 'snowflake-far'
		: 'snowflake-little-far';
	
	flake.className = `snowflake ${depthClass}`;

  const size = rand(4, 10);

  flake.style.left = `${rand(0, 100)}vw`;
  flake.style.animationDuration = `${rand(5, 10)}s`;
  flake.style.width = flake.style.height = `${size}px`;

  document.body.appendChild(flake);
}

function makeItRainSnow () {
	for (let i = 0; i < NUM_FLAKES; i++) {
		generateFakeSnow();
	}
}

updateDisplay();
makeItRainSnow();