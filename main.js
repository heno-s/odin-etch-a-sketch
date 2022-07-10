// grid width = size in pixels
// grid size = size in number of squares per dimension

const dialog = document.querySelector("dialog");
const grid = document.querySelector(".grid");
const gridWidth = grid.clientWidth;
const resizeButton = document.querySelector(".resize-button");
const closeButton = document.querySelector(".close-button");
const form = document.forms[0];
const sizeInput = form.querySelector("input");
const sizeLimit = 100;
const initialSize = 16;
const paintColor = "#000";

sizeInput.value = initialSize;
resizeButton.addEventListener("click", showModal);
closeButton.addEventListener("click", closeModal);
form.addEventListener("submit", (evt) => {
    createGrid(+sizeInput.value);
});

function makeSquare(size) {
    const square = document.createElement("div");
    square.style.width = size + "px";
    square.style.height = size + "px";
    return square;
}

function createGrid(gridSize) {
    if (typeof gridSize !== "number" || gridSize <= 0) {
        return;
    }
    if (gridSize > sizeLimit) {
        gridSize = sizeLimit;
    }
    if (gridSize % 1 !== 0) {
        // is float number
        gridSize = Math.round(gridSize);
    }
    const squareSize = gridWidth / gridSize;

    clearGrid();
    for (let i = 0; i < gridSize ** 2; i++) {
        const square = makeSquare(squareSize);
        square.addEventListener("mouseenter", paint);
        grid.appendChild(square);
    }
}

function clearGrid() {
    [...grid.children].forEach((square) => square.removeEventListener("mouseenter", paint));
    grid.innerHTML = "";
}

function showModal() {
    dialog.showModal();
}

function closeModal() {
    dialog.close();
}

function colorize(target, color) {
    target.style.backgroundColor = color;
}

function paint(evt) {
    if (!(evt instanceof Event) || evt.ctrlKey) return;
    colorize(evt.target, paintColor);
}

createGrid(initialSize);
