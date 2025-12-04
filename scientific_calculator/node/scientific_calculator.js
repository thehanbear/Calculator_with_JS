let inputValue = "0";

function updateNumber() {
  console.log ("Result:", inputValue);
}

function calculate(numA, numB, op) {
  const a = parseFloat(numA);
  const b = parseFloat(numB);

  switch (op) {
		case "+":
		case "add":
      return (a + b).toString();
    case "-":
		case "sub":
      return (a - b).toString();
    case "*":
		case "mul":
      return (a * b).toString();
    case "/":
		case "div":
      if (b === 0) return "Error";
      return (a / b).toString();
    default:
      return console.log("Invalid operator");
  }
}

function scientificCalculate(numA, sci) {
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

const [, , arg1, op, arg2] = process.argv;

if (arg1 && op && !arg2) {
	inputValue = scientificCalculate(arg1, op);
	updateNumber();
	process.exit(0);
}
if (!arg1 || !op || !arg2) {
	console.log ("Please write numbers and operators (ex: node scientfiic_calculator 5 fact");
	process.exit(1);
}

inputValue = calculate(arg1, arg2, op);
updateNumber();