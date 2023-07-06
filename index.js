const grid = document.querySelector(".grid__container");
const rangeInput = document.querySelector('input');
const rangeLabel = document.querySelector('label');

//modes
const toggleMode = document.querySelector('.toggle');
const rainbowMode = document.querySelector('.rainbow');
const simpleMode = document.querySelector('.simple');
const eraseMode = document.querySelector('.erase');


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
        gridItem.removeEventListener('mousedown',toggleClickTrue);
        gridItem.removeEventListener('mouseup',toggleClickTrue);
        gridItem.removeEventListener('mousemove',toggleBackground);
        gridItem.removeEventListener('mousemove',toggleWhiteground);
        gridItem.removeEventListener('mousemove',toggleRainbow);
        gridItem.addEventListener('mousedown',toggleClickTrue);
        gridItem.addEventListener('mouseup',toggleClickFalse);
        gridItem.addEventListener('mousemove',toggleChange);
    });
}

function handleSimpleMode(e) {
    const gridItem = document.querySelectorAll('.grid__item');
    gridItem.forEach(gridItem => {
        gridItem.removeEventListener('mousedown',toggleClickTrue);
        gridItem.removeEventListener('mouseup',toggleClickTrue);
        gridItem.removeEventListener('mousemove',toggleChange);
        gridItem.removeEventListener('mousemove',toggleWhiteground);
        gridItem.removeEventListener('mousemove',toggleRainbow);
        gridItem.addEventListener('mousedown',() => isClicked=true);
        gridItem.addEventListener('mouseup',() => isClicked=false);
        gridItem.addEventListener('mousemove',toggleBackground);
    });
}
function handleEraseMode(e) {
    const gridItem = document.querySelectorAll('.grid__item');
    gridItem.forEach(gridItem => {
        gridItem.removeEventListener('mousedown',toggleClickTrue);
        gridItem.removeEventListener('mouseup',toggleClickTrue);
        gridItem.removeEventListener('mousemove',toggleBackground);
        gridItem.removeEventListener('mousemove',toggleChange);
        gridItem.removeEventListener('mousemove',toggleRainbow);
        gridItem.addEventListener('mousedown',() => isClicked=true);
        gridItem.addEventListener('mouseup',() => isClicked=false);
        gridItem.addEventListener('mousemove',toggleWhiteground);
    });
}
function handleRainbowMode(e) {
    const gridItem = document.querySelectorAll('.grid__item');
    gridItem.forEach(gridItem => {
        gridItem.removeEventListener('mousedown',toggleClickTrue);
        gridItem.removeEventListener('mouseup',toggleClickTrue);
        gridItem.removeEventListener('mousemove',toggleChange);
        gridItem.removeEventListener('mousemove',toggleWhiteground);
        gridItem.removeEventListener('mousemove',toggleBackground);
        gridItem.addEventListener('mousedown',() => isClicked=true);
        gridItem.addEventListener('mouseup',() => isClicked=false);
        gridItem.addEventListener('mousemove',toggleRainbow);
    });
}
