const rainbowColors = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'];
let rainbowColorsMode = false;

function createGrid(numRows = 16, numCols = 16) {
    let grid = document.querySelector('.grid');
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            let gridSquare = document.createElement('div');
            gridSquare.classList.add('grid-square');
            gridSquare.style.width = (grid.offsetWidth / numRows) - 2;
            gridSquare.style.height = (grid.offsetHeight / numCols) - 2;
            // console.log(gridSquare.style.width);
            // console.log(gridSquare.style.height);
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
    if (rainbowColorsMode) rainbowColorsMode = false;
    else rainbowColorsMode = true;
});

upgradeGrid();