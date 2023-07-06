const grid = document.querySelector(".grid__container");
const rangeInput = document.querySelector('input');
const rangeLabel = document.querySelector('label');

//modes
const toggleMode = document.querySelector('[value="Weird"]');
const rainbowMode = document.querySelector('[value="Rainbow"]');
const simpleMode = document.querySelector('[value="Normal"]');
const eraseMode = document.querySelector('[value="Eraser"]');


//events
rangeInput.addEventListener('change', handleRangeChange);

toggleMode.addEventListener('click', handleToggleMode);

rainbowMode.addEventListener('click', handleRainbowMode);

simpleMode.addEventListener('click', handleSimpleMode);

eraseMode.addEventListener('click', handleEraseMode);

window.onload = () => {
    rangeLabel.textContent = `${rangeInput.value} per line`;
    setupTheGrid();
}

function handleRangeChange() {
    grid.innerHTML = null;
    rangeLabel.textContent = `${rangeInput.value} per line`;
    setupTheGrid();
}

function setupTheGrid() {
    const gridWidth = grid.clientWidth;
    const gridHeight = grid.clientHeight;
    const gridItemWidth = (gridWidth / rangeInput.value);
    grid.style.gridTemplateColumns = `repeat(${rangeInput.value}, ${gridItemWidth}px)`;
    const numberOfItems = rangeInput.value * rangeInput.value;
    for(let i = 0 ; i < numberOfItems ; i++){
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid__item');
        gridItem.style.width = `${gridItemWidth}px`;
        gridItem.style.height = `${gridItemWidth}px`;
        grid.appendChild(gridItem);
    }
}

let isClicked = false;

function toggleClickTrue(){
    isClicked=true
}
function toggleClickFalse(){
    isClicked=false;
}
function toggleChange(e){
    if(isClicked) {
        e.target.classList.toggle('grid__itemToggle');
    }
}
function toggleBackground(e){
    if(isClicked) {
        e.target.style.backgroundColor = 'black';
    }
}
function toggleWhiteground(e){
    if(isClicked) {
        e.target.style.backgroundColor = 'white';
    }
}
function toggleRainbow(e){
    const colors = ['blue', 'pink', 'purple', 'green', 'yellow', 'orange', 'red'];
    const indexPicker = Math.floor(Math.random() * colors.length);
    if(isClicked) {
        e.target.style.backgroundColor = `${colors[indexPicker]}`;
    }
}

function handleToggleMode() {
    const gridItem = document.querySelectorAll('.grid__item');
    gridItem.forEach(gridItem => {
        gridItem.removeEventListener('pointerdown',toggleClickTrue);
        gridItem.removeEventListener('pointerup',toggleClickTrue);
        gridItem.removeEventListener('pointermove',toggleBackground);
        gridItem.removeEventListener('pointermove',toggleWhiteground);
        gridItem.removeEventListener('pointermove',toggleRainbow);
        gridItem.addEventListener('pointerdown',toggleClickTrue);
        gridItem.addEventListener('pointerup',toggleClickFalse);
        gridItem.addEventListener('pointermove',toggleChange);
    });
}

function handleSimpleMode(e) {
    const gridItem = document.querySelectorAll('.grid__item');
    gridItem.forEach(gridItem => {
        gridItem.removeEventListener('pointerdown',toggleClickTrue);
        gridItem.removeEventListener('pointerup',toggleClickTrue);
        gridItem.removeEventListener('pointermove',toggleChange);
        gridItem.removeEventListener('pointermove',toggleWhiteground);
        gridItem.removeEventListener('pointermove',toggleRainbow);
        gridItem.addEventListener('pointerdown',() => isClicked=true);
        gridItem.addEventListener('pointerup',() => isClicked=false);
        gridItem.addEventListener('pointermove',toggleBackground);
    });
}
function handleEraseMode(e) {
    const gridItem = document.querySelectorAll('.grid__item');
    gridItem.forEach(gridItem => {
        gridItem.removeEventListener('pointerdown',toggleClickTrue);
        gridItem.removeEventListener('pointerup',toggleClickTrue);
        gridItem.removeEventListener('pointermove',toggleBackground);
        gridItem.removeEventListener('pointermove',toggleChange);
        gridItem.removeEventListener('pointermove',toggleRainbow);
        gridItem.addEventListener('pointerdown',() => isClicked=true);
        gridItem.addEventListener('pointerup',() => isClicked=false);
        gridItem.addEventListener('pointermove',toggleWhiteground);
    });
}
function handleRainbowMode(e) {
    const gridItem = document.querySelectorAll('.grid__item');
    gridItem.forEach(gridItem => {
        gridItem.removeEventListener('pointerdown',toggleClickTrue);
        gridItem.removeEventListener('pointerup',toggleClickTrue);
        gridItem.removeEventListener('pointermove',toggleChange);
        gridItem.removeEventListener('pointermove',toggleWhiteground);
        gridItem.removeEventListener('pointermove',toggleBackground);
        gridItem.addEventListener('pointerdown',() => isClicked=true);
        gridItem.addEventListener('pointerup',() => isClicked=false);
        gridItem.addEventListener('pointermove',toggleRainbow);
    });
}
