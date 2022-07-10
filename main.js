const dialog = document.querySelector("dialog");
const grid = document.querySelector(".grid");
const gridSize = grid.clientWidth;

function loadGrid(gridSizeInSquares) {
    if (gridSizeInSquares <= 0) {
        return;
    }
    const squareSize = gridSize / gridSizeInSquares;

    for (let i = 0; i < gridSizeInSquares ** 2; i++) {
        const square = makeSquare(squareSize);
        grid.appendChild(square);
    }
}

function makeSquare(size) {
    const square = document.createElement("div");
    square.style.width = size + "px";
    square.style.height = size + "px";
    return square;
}

loadGrid(16);
