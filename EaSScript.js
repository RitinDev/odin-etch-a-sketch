const rainbowColors = ['#CC99FF', '#A9D1F7', '#B4F0A7', '#FFFFBF', '#FFDFBE', '#FFB1B0'];
let rainbowColorsMode = false;

function createGrid(numRows = 16, numCols = 16) {
    let grid = document.querySelector('.grid');
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            let gridSquare = document.createElement('div');
            gridSquare.classList.add('grid-square');
            gridSquare.style.width = (grid.offsetWidth / numRows) - 2;
            gridSquare.style.height = (grid.offsetHeight / numCols) - 2;
            gridSquare.addEventListener('mouseover', (e) => {
                if (!e.shiftKey) addColor(e.target);
            });
            grid.appendChild(gridSquare);
        }
    }
}

function addColor(gridSquare) {
    if (rainbowColorsMode) {
        gridSquare.style.backgroundColor = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    } else {
        let colorSelector = document.querySelector(`input[type="color"]`);
        let currentColor = colorSelector.value;
        gridSquare.style.backgroundColor = currentColor;
    }
}

function reset() {
    let grid = document.querySelector('.grid');
    grid.childNodes.forEach(square => square.style.backgroundColor = null);
}

function removeGrid() {
    let grid = document.querySelector('.grid');
    grid.innerHTML = '';
}

function upgradeGrid() {
    let rowsAndCols;
    let gridSquaresSlider = document.querySelector("#myRange");
    gridSquaresSlider.addEventListener('change', () => {
        rowsAndCols = gridSquaresSlider.value;
        removeGrid();
        createGrid(rowsAndCols, rowsAndCols);
    });
}

createGrid();

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', reset);

let rainbowModeButton = document.getElementById('rainbow-colors-button');
rainbowModeButton.addEventListener('click', () => {
    if (rainbowColorsMode) {
        rainbowColorsMode = false;
        rainbowModeButton.classList.remove('clicked');
        rainbowModeButton.classList.add('not-clicked');
    } else {
        rainbowColorsMode = true;
        rainbowModeButton.classList.remove('not-clicked');
        rainbowModeButton.classList.add('clicked');
    }
});

upgradeGrid();

window.addEventListener('resize', () => {
    let gridSquaresSlider = document.querySelector("#myRange");
    rowsAndCols = gridSquaresSlider.value;
    removeGrid();
    createGrid(rowsAndCols, rowsAndCols);
});