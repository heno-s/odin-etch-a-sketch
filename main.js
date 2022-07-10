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
const helper = document.querySelector(".helper");
const shortcuts = document.querySelector(".shortcuts");

sizeInput.value = initialSize;
resizeButton.addEventListener("click", showModal);
closeButton.addEventListener("click", closeModal);
form.addEventListener("submit", (evt) => {
    createGrid(+sizeInput.value);
});
helper.addEventListener("mouseenter", showShortcuts);
helper.addEventListener("mouseleave", closeShortcuts);

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

function showShortcuts() {
    shortcuts.show();
}

function closeShortcuts() {
    shortcuts.close();
}

function colorize(target, rgb) {
    target.style.backgroundColor = `rgb(${rgb})`;
}

function darken(target) {
    const brightness = target.style.filter.substr(11, 3);
    target.style.filter = `brightness(${brightness ? brightness - 0.1 : 0.9})`; // last time this is NaN
}

function paint(evt) {
    if (!(evt instanceof MouseEvent) || evt.ctrlKey) return;
    let rgb = randomRGB().toString();
    if (evt.shiftKey) {
        rgb = "0,0,0";
    }
    if (evt.target.style.backgroundColor) {
        darken(evt.target);
    } else {
        colorize(evt.target, rgb);
    }
}

function randomRGB() {
    return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
}

window.addEventListener("keydown", (evt) => {
    if (evt.key === "m" && evt.ctrlKey) {
        createGrid(+sizeInput.value);
    }
});

createGrid(initialSize);
