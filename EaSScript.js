const rainbowColors = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'];
let rainbowColorsMode = false;

function createGrid(numRows = 16, numCols = 16) {
    let grid = document.querySelector('.grid');
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            let gridSquare = document.createElement('div');
            gridSquare.classList.add('grid-square');
            gridSquare.style.width = (grid.offsetWidth / numRows) - 2;
            gridSquare.style.height = (grid.offsetHeight / numCols);
            // console.log(gridSquare.style.width);
            // console.log(gridSquare.style.height);
            gridSquare.addEventListener('mouseover', (e) => {
                addColor(e.target);
            });
            grid.appendChild(gridSquare);
        }
    }
}

function reset() {
    let grid = document.querySelector('.grid');
    grid.childNodes.forEach(square => square.style.backgroundColor = null);
}

createGrid(16, 16);

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', reset);