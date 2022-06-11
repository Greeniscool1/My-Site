//add gamma function, hyperbolic functions, inverse functions, make button go in a little when clicked
const html_ans = document.getElementById("ans");
const button_cover = document.getElementById("button_cover")
const input = document.getElementById("input");
const mode = document.getElementById("mode");

const buttonSin = document.getElementById("button_sin");
const buttonCos = document.getElementById("button_cos");
const buttonTan = document.getElementById("button_tan");

let s = "";

let radCheck = false;
let ans = 0;

const pi = Math.PI;
let sin = Math.sin;
let cos = Math.cos;
let tan = Math.tan;
let arcsin = Math.asin;
let arccos = Math.acos;
let arctan = Math.atan;
const scale = pi/180

const ln = Math.log;
const log = Math.log10;
const Exp = Math.exp;
const e = Math.E;

let invCount = 0;

function factorial(num) {
	num = Math.round(num);

	if (num == 1 || num == 0) {
		return 1;
	}

	try {
		return num * factorial(num-1);
	} catch {

	}
}

function switchMode() {
	if (mode.innerText == "Deg") {
		mode.innerText = " Rad ";

		sin = Math.sin;
		cos = Math.cos;
		tan = Math.tan;
	} else {
		mode.innerText = " Deg ";

		sin = function (num) {
			return Math.sin(scale*num);
		};

		cos = function(num) {
			return Math.cos(scale*num);
		};

		tan = function(num) {
			return Math.tan(scale*num);
		};
	}
}

function invertCalculator() {
	invCount++;

	if (invCount % 2 == 0) {
		buttonSin.innerHTML = 'sin';
		buttonCos.innerHTML = 'cos';
		buttonTan.innerHTML = 'tan';
	} else {
		buttonSin.innerHTML = 'sin<sup>-1</sup>';
		buttonCos.innerHTML = 'cos<sup>-1</sup>';
		buttonTan.innerHTML = 'tan<sup>-1</sup>';
	}
}

function trigCheck(func) {
	if (func == "sin") {
		if (invCount % 2 == 0) {
			input.innerText += "sin(";
		} else {
			input.innerText += "arcsin(";
		}
	} else if (func == "cos") {
		if (invCount % 2 == 0) {
			input.innerText += "cos(";
		} else {
			input.innerText += "arccos(";
		}
	} else if (func == "tan") {
		if (invCount % 2 == 0) {
			input.innerText += "tan(";
		} else {
			input.innerText += "arctan(";
		}
	}
}

function check() {
	input.innerText = input.innerText.replace(/π/gi, pi);
	input.innerText = input.innerText.replace(/e/g, e);
	input.innerText = input.innerText.replace(/√/gi, "Math.sqrt");
	input.innerText = input.innerText.replace(/Ans/gi, ans);
	input.innerText = input.innerText.replace(/\^/gi, '**');

	try {
		if (Number.isInteger(Function("return " + input.innerText)())) {
			input.innerText = Function("return " + input.innerText)();
		} else {
			input.innerText = Function("return " + input.innerText)().toFixed(11);

			while (input.innerText.endsWith("0") || input.innerText.endsWith(".")) {
				s = input.innerText.split("");
				s.splice(s.length-1, 1);		
				s = s.join("");
				input.innerText = s;
			}
		}

		ans = input.innerText;
		html_ans.innerText = "ans = " + ans;
	} catch {
		input.innerText = "Error";
	}
}