const canvas = document.getElementById("canvas");
const width = canvas.width;
const height = canvas.height;
const scalingFactor = width/4;
const graphics = canvas.getContext("2d");

const button = document.getElementById("button");
const num = document.getElementById("num");

let translatedX = 0;
let translatedY = 0;

let mouseX = 0;
let mouseY = 0;

let scale = 1;

canvas.addEventListener("click", function(mouse) {
	mouseX = (mouse.offsetX-width/2)/(width/4);
	mouseY = (mouse.offsetY-height/2)/(height/4);

	translatedX += mouseX/scale;
	translatedY += mouseY/scale;

	scale *= 2;

	mandelbrotDraw(num.value);
})

function mandelbrotDraw(iterations) {

	graphics.clearRect(0, 0, width, height);
	//multiply by 4 in order to get the scaling right
	for (let i = 0; i <= width; i++) {
		for (let j = 0; j <= height; j++) {
			let x = 0;
			let y = 0;
			
			const re = ((i-width/2)/scalingFactor)/scale + translatedX;
			const im = ((j-height/2)/scalingFactor)/scale + translatedY;

			let k = 0;

			while (x*x + y*y <= 4 && k < iterations) {
				let x_new = x*x-y*y+re;
				y = 2*x*y+im;

				x = x_new;

				k++;
			}

			if (k < iterations) {
				graphics.fillStyle = "hsl(" + iterations/k + "," + k + "%, " + k  + "%)";
				graphics.fillRect(i, j, 1, 1);
			} else {
				graphics.fillStyle = "white";
				graphics.fillRect(i, j, 1, 1);
			}
		}
	}
}

mandelbrotDraw(num.value);