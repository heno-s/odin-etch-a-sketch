const dialog = document.querySelector("dialog");
const grid = document.querySelector(".grid");
const gridSize = grid.clientWidth;
const resizeButton = document.querySelector(".resize-button");
const closeButton = document.querySelector(".close-button");
const form = document.forms[0];
const gridSizeInput = form.querySelector("input");
const gridSizeLimit = 100;

resizeButton.addEventListener("click", showModal);
closeButton.addEventListener("click", closeModal);
form.addEventListener("submit", (evt) => {
    loadGrid(+gridSizeInput.value);
});

function makeSquare(size) {
    const square = document.createElement("div");
    square.style.width = size + "px";
    square.style.height = size + "px";
    return square;
}

function loadGrid(gridSizeInSquares) {
    if (typeof gridSizeInSquares !== "number" || gridSizeInSquares <= 0) {
        return;
    }
    if (gridSizeInSquares > gridSizeLimit) {
        gridSizeInSquares = gridSizeLimit;
    }
    const squareSize = gridSize / gridSizeInSquares;

    clearGrid();
    for (let i = 0; i < gridSizeInSquares ** 2; i++) {
        const square = makeSquare(squareSize);
        grid.appendChild(square);
    }
}

function clearGrid() {
    grid.innerHTML = "";
}

function showModal() {
    dialog.showModal();
}

function closeModal() {
    dialog.close();
}

loadGrid(16);
