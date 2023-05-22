const colors = document.querySelectorAll(".circle")
const pickColor = document.querySelector(".color")
const duster = document.querySelector(".duster")
const cleaner = document.querySelector(".delete")
const brushValue = document.querySelector(".brushValue")

/*Tools*/
const painter = document.querySelector("#ring")
const save = document.querySelector("#save")


/* Canvas */
const canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d")

/* Canvas Values */
let isDrawing = false;
let brush = 10;
let selectedTool = "ring";

let lastX = 0;
let lastY = 0;
let hue = 0;

duster.addEventListener("click", () => {
    ctx.strokeStyle = "#FFFFFF";
    selectedTool = "eraser"
})


colors.forEach((color) => {
  color.addEventListener("click", () => {
    const dataColor = color.getAttribute("data-color");
    if (dataColor) {
      ctx.strokeStyle = dataColor;
      ctx.fillStyle = dataColor;
      console.log("Selected color:", dataColor);
    } else {
      console.error("Invalid color: " + color);
    }
    selectedTool = "brush";
  });
});



const startDraw = (e) => {
  isDrawing = true;
  ctx.lineWidth = brush;
  if (selectedTool === "ring") {
    [lastX, lastY] = [e.offsetX, e.offsetY];
    ctx.beginPath();
    hue = Math.floor(Math.random() * 360);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  } else {
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = ctx.strokeStyle;
  }
};


const stopDraw = () => {
    isDrawing = false;
}


const draw = (e) => {
  if (!isDrawing) return;
  if (selectedTool === "brush") {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (selectedTool === "ring") {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue += 1;
    if (hue >= 360) {
    hue = 0;
    }
  }else if(selectedTool === "eraser"){
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}
};





pickColor.addEventListener("input", (e) => ctx.strokeStyle = e.target.value); //input color changer

brushValue.addEventListener("input", (e) => {
    brush = e.target.value
    document.querySelector("#brushTextValue").textContent = e.target.value + " px"
})


cleaner.addEventListener("click", () => {
    if(confirm("The entire page will be cleared. Are you sure?")){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

painter.addEventListener("click", () => {
  painter.id = "ring";
  selectedTool = "ring";
});

// SS

const takeSs = () =>{
    const targetElement = document.querySelector('.canvas'); 
    
    html2canvas(targetElement).then(canvas => {
        const link = document.createElement('a');
        link.download = 'ekran-goruntusu.png'; 
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

save.addEventListener("click", takeSs);

//Mouse Event

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mousemove", draw);
