const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Check for a winner
function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'Draw';
}

// Handle player click
function handleClick(e) {
    const index = e.target.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {
        isGameActive = false;
        message.textContent = winner === 'Draw' ? 'It\'s a Draw!' : `${winner} Wins!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Restart the game
function restartGame() {
    board.fill('');
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    isGameActive = true;
    message.textContent = '';
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
