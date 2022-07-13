// /** Connect Four
//  *
//  * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
//  * column until a player gets four-in-a-row (horiz, vert, or diag) or until
//  * board fills (tie)
//  */
class Game {
  constructor(height, width,...players) {
    this.height = height;
    this.width = width;
    this.currentPlayer = 0;
    this.players = players;
    this.gameBoard = [];
    this.makeBoard();
    this.makeHtmlBoard();
    this.ongoing = true;
  }
  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      this.gameBoard.push(Array.from({ length: this.width }));
    }
  }
  makeHtmlBoard() {
    const board = document.getElementById('board');
    board.innerHTML = ''; //empty the board
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this)); //have to bind the function to the game
    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
    board.append(top);
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');
      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
      board.append(row);
    }
  }
  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.gameBoard[y][x]) {
        return y;
      }
    }
    return null;
  }
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.players[this.currentPlayer].color; //sets the piece color
    piece.style.top = -50 * (y + 2); //?
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }
  endGame(msg) {
    alert(msg);
  }
  handleClick(evt) {
    if (this.ongoing) {
      const x = +evt.target.id;
      const y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }
      this.gameBoard[y][x] = this.currentPlayer + 1;
      this.placeInTable(y, x);
      if (this.checkForWin()) {
        this.ongoing = false;
        return this.endGame(`Player ${this.currentPlayer + 1} won!`);
      }
      if (this.gameBoard.every(row => row.every(cell => cell))) {
        this.ongoing = false;
        return this.endGame('Tie!');
      }
      this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
    }
  }
  checkForWin() {
    const _win = (cells) => {
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.gameBoard[y][x] === this.currentPlayer
      );
    }
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}
class Player{
  constructor(color){
    this.color = color;
  }
}
// const p1 = new Player('blue');
// const p2 = new Player('red');
// new Game(6, 7, p1, p2);
// const resetbutton = document.getElementById('restart');
// resetbutton.addEventListener('click', (e) => {
//   new Game(6, 7, p1, p2);
// })
const playerForm = document.getElementById('startGame');
playerForm.addEventListener('submit', e =>{
  e.preventDefault();
  const p1 = new Player(e.target['player1'].value);
  const p2 = new Player(e.target['player2'].value);
  new Game(6, 7, p1, p2);
})