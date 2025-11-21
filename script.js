const operators = ["÷", "x", "-", "+", "="];
const functions = ["AC", "+/-", "%"];

const display = document.getElementById("calculator-input");

let A = 0;
let operator = null;
let B = null;

function	resetAll() {
	A = null;
	operator = null;
	B = null;
}

function	clearAll() {
	resetAll();
	display.value ="0";
}

clearAll();

document.getElementById("buttons").addEventListener("click", function (e) {
	const target = e.target;
	const	value = target.textContent.trim();

	if (operators.includes(value)) {
		insertOperator(value);
	} else if (functions.includes(value)) {
		insertFunction(value);
	} else {
		insertNumber(value);
	}
});

function insertOperator(value) {
	if (value === "=") {

		if (A != null && operator != null) {
			B = display.value;
			
			let numA = Number(A);
			let numB = Number(B);

			if (operator === "÷"){
				display.value = numA/numB; 
			} else if (operator === "x" || operator === "X") {
				display.value = numA*numB;
			} else if (operator === "-") {
				display.value = numA-numB; 
			} else if (operator === "+") {
				display.value = numA+numB; 
			}
			resetAll();
			}
		} else {
			operator = value;
			A = display.value;
			display.value = "";
		}
}

function insertFunction(value) {
	if (value === "AC") {
		clearAll();
		display.value = "0";
	} else if (value === "+/-") {
		if (display.value !== "" && display.value !== "0") {
			if (display.value[0] == "-") {
				display.value = display.value.slice(1);
			} else {
				display.value = "-" + display.value;
			}
		}
	}
	else if (value === "%") {
		const	currentNumber = display.value
		display.value =  currentNumber / 100;
	}
}

function insertNumber(value) {
	if (value === ".") {
		if (!display.value.includes(".")) {
			if (display.value === "0" || display.value === "") {
				display.value = "0.";
			} else {
				display.value += ".";
			}
		}
		return;
	}
	if (display.value === "0") {
		display.value = value;
	} else {
		display.value += value;
	}
}