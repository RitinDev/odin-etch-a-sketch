const rainbowColors = ['#CC99FF', '#A9D1F7', '#B4F0A7', '#FFFFBF', '#FFDFBE', '#FFB1B0'];
let rainbowColorsMode = false;
let rowsAndCols = document.querySelector("#myRange").value;
let colorMap = []

function storeSize() {
    localStorage.setItem('rowsAndCols', JSON.stringify(rowsAndCols));
}

function retrieveSize() {
    let retrievedSize = JSON.parse(localStorage.getItem('rowsAndCols'));
    if (retrievedSize) {
        rowsAndCols = retrievedSize;
    }
    document.querySelector("#myRange").value = rowsAndCols;
}

retrieveSize();

function createMap(numRows, numCols) {
    colorMap = [];
    for (let i = 0; i < numRows; i++) {
        colorMap[i] = [];
        for (let j = 0; j < numCols; j++) {
            colorMap[i][j] = null;
        }
    }
}

function storeGrid() {
    localStorage.setItem('grid', JSON.stringify(colorMap));
}

function retrieveGrid() {
    let retrievedGrid = JSON.parse(localStorage.getItem('grid'));
    if (retrievedGrid) {
        colorMap = retrievedGrid;
    } else {
        createMap(rowsAndCols, rowsAndCols);
    }
}

retrieveGrid();

function createGrid(numRows, numCols) {
    let grid = document.querySelector('.grid');
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            let gridSquare = document.createElement('div');
            gridSquare.classList.add('grid-square');
            gridSquare.style.width = (grid.offsetWidth / numRows) - 2;
            gridSquare.style.height = (grid.offsetHeight / numCols) - 2;
            gridSquare.style.backgroundColor = colorMap[i][j];
            gridSquare.addEventListener('mouseover', (e) => {
                if (!e.shiftKey) addColor(e.target, i, j);
            });
            grid.appendChild(gridSquare);
        }
    }
}

function addColor(gridSquare, i, j) {
    if (rainbowColorsMode) {
        const random_color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
        gridSquare.style.backgroundColor = random_color;
        colorMap[i][j] = random_color;
    } else {
        let colorSelector = document.querySelector(`input[type="color"]`);
        let currentColor = colorSelector.value;
        gridSquare.style.backgroundColor = currentColor;
        colorMap[i][j] = currentColor;
    }
    storeSize();
    storeGrid();
}

function reset() {
    let grid = document.querySelector('.grid');
    grid.childNodes.forEach(square => square.style.backgroundColor = null);
    for (let i = 0; i < colorMap.length; i++) {
        for (let j = 0; j < colorMap[i].length; j++) {
            colorMap[i][j] = null;
        }
    }
    storeSize();
    storeGrid();
}

function removeGrid() {
    let grid = document.querySelector('.grid');
    grid.innerHTML = '';
}

function upgradeGrid() {
    let gridSquaresSlider = document.querySelector("#myRange");
    gridSquaresSlider.addEventListener('change', () => {
        rowsAndCols = gridSquaresSlider.value;
        storeSize();
        removeGrid();
        createMap(rowsAndCols, rowsAndCols);
        createGrid(rowsAndCols, rowsAndCols);
    });
}

createGrid(rowsAndCols, rowsAndCols);

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