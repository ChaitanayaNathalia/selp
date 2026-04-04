document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.getElementById('grid');
    const scoreDisplay = document.getElementById('score');
    let squares = [];
    let score = 0;

    // Create the playing board
    function createBoard() {
        for (let i = 0; i < 16; i++) {
            let square = document.createElement('div');
            square.innerHTML = 0;
            square.className = 'tile';
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }
    createBoard();

    // Generate a new number (mostly 2s)
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            updateColors();
        } else {
            generate();
        }
    }

    // Update the CSS classes for images
    function updateColors() {
        for (let i = 0; i < 16; i++) {
            let val = squares[i].innerHTML;
            squares[i].className = 'tile';
            if (val > 0) squares[i].classList.add(`tile-${val}`);
        }
    }

    // Slide logic (pushes to the left/top)
    function slideLeftArray(row) {
        let filteredRow = row.filter(num => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        return filteredRow.concat(zeros);
    }

    // Slide logic (pushes to the right/bottom)
    function slideRightArray(row) {
        let filteredRow = row.filter(num => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        return zeros.concat(filteredRow);
    }

    // Math for combining identical tiles
    function combine(row) {
        for (let i = 0; i < 3; i++) {
            if (row[i] === row[i + 1] && row[i] !== 0) {
                row[i] = row[i] * 2;
                row[i + 1] = 0;
                score += row[i];
                scoreDisplay.innerHTML = score;
            }
        }
        return row;
    }

    function moveRight() {
        for (let i = 0; i < 16; i += 4) {
            let row = [parseInt(squares[i].innerHTML), parseInt(squares[i+1].innerHTML), parseInt(squares[i+2].innerHTML), parseInt(squares[i+3].innerHTML)];
            
            let newRow = slideRightArray(row); 
            newRow = combine(newRow.reverse()).reverse(); 
            newRow = slideRightArray(newRow); // THE FIX: Slide again to close gaps!
            
            squares[i].innerHTML = newRow[0];
            squares[i+1].innerHTML = newRow[1];
            squares[i+2].innerHTML = newRow[2];
            squares[i+3].innerHTML = newRow[3];
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i += 4) {
            let row = [parseInt(squares[i].innerHTML), parseInt(squares[i+1].innerHTML), parseInt(squares[i+2].innerHTML), parseInt(squares[i+3].innerHTML)];
            
            let newRow = slideLeftArray(row);
            newRow = combine(newRow);
            newRow = slideLeftArray(newRow);
            
            squares[i].innerHTML = newRow[0];
            squares[i+1].innerHTML = newRow[1];
            squares[i+2].innerHTML = newRow[2];
            squares[i+3].innerHTML = newRow[3];
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let col = [parseInt(squares[i].innerHTML), parseInt(squares[i+4].innerHTML), parseInt(squares[i+8].innerHTML), parseInt(squares[i+12].innerHTML)];
            
            let newCol = slideRightArray(col); 
            newCol = combine(newCol.reverse()).reverse();
            newCol = slideRightArray(newCol); // THE FIX: Slide again to close gaps!
            
            squares[i].innerHTML = newCol[0];
            squares[i+4].innerHTML = newCol[1];
            squares[i+8].innerHTML = newCol[2];
            squares[i+12].innerHTML = newCol[3];
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let col = [parseInt(squares[i].innerHTML), parseInt(squares[i+4].innerHTML), parseInt(squares[i+8].innerHTML), parseInt(squares[i+12].innerHTML)];
            
            let newCol = slideLeftArray(col);
            newCol = combine(newCol);
            newCol = slideLeftArray(newCol);
            
            squares[i].innerHTML = newCol[0];
            squares[i+4].innerHTML = newCol[1];
            squares[i+8].innerHTML = newCol[2];
            squares[i+12].innerHTML = newCol[3];
        }
    }

    // Listen for arrow keys
    function control(e) {
        // Prevent default scrolling when playing the game
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
        
        if (e.key === 'ArrowLeft') { moveLeft(); generate(); updateColors(); }
        else if (e.key === 'ArrowRight') { moveRight(); generate(); updateColors(); }
        else if (e.key === 'ArrowUp') { moveUp(); generate(); updateColors(); }
        else if (e.key === 'ArrowDown') { moveDown(); generate(); updateColors(); }
    }
    document.addEventListener('keydown', control);
});