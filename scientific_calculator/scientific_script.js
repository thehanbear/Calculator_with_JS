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
function sciFunction(numA, sci) {
	const a = parseFloat(numA);

	if (Number.isNaN(a) && sci !== "pi" && sci !== "e") {
    return "Invalid number";
  }

  switch (sci) {
		case "sin":
      return Math.sin(a).toString();
		case "cos":
      return Math.cos(a).toString();
		case "tan":
      return Math.tan(a).toString();
		case "sinh":
      return Math.sinh(a).toString();
    case "cosh":
      return Math.cosh(a).toString();
    case "tanh":
      return Math.tanh(a).toString();
		case "exp":
      return Math.exp(a).toString();      // eˣ
    case "ln":
      return Math.log(a).toString();     
    case "log10":
      return Math.log10(a).toString();    // log₁₀
    case "pow2":
      return Math.pow(a, 2).toString();   // x²
    case "pow3":
      return Math.pow(a, 3).toString();   // x³
    case "pow10":
      return Math.pow(10, a).toString();  // 10ˣ

		case "sqrt":
			if (a < 0) 
				return "Can't tale Squre root of negative number";
      return Math.sqrt(a).toString();
		
		case "inv":
      if (a === 0) return "Error";
      return (1 / a).toString();

    case "fact": {
      if (!Number.isInteger(a) || a < 0) {
        return "Factorial only for positive integers";
      }
      let res = 1;
      for (let i = 2; i <= a; i++) res *= i;
      return res.toString();
    }

		case "pi":
      return Math.PI.toString();
    case "e":
      return Math.E.toString();

    default:
      return "Invalid operator";
  }
}

updateDisplay();


// It's winter time :)
const NUM_FLAKES = 80;

const rand = (min, max) => Math.random() * (max - min) + min;

for (let i = 0; i < NUM_FLAKES; i++) {
  const flake = document.createElement("div");
  flake.className = "snowflake";

  const size = rand(3, 8);

  flake.style.left = `${rand(0, 100)}vw`;
  flake.style.animationDuration = `${rand(5, 10)}s`;
  flake.style.opacity = rand(0.3, 1);
  flake.style.width = flake.style.height = `${size}px`;

  document.body.appendChild(flake);
}
