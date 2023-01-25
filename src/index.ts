import Sudoku from "./sudoku";
import "./style.scss";

const sudoku: Sudoku = new Sudoku(document.getElementById("sudoku"));
sudoku.generate();
sudoku.startGame();

document
  .getElementById("restart-button")
  .addEventListener("click", (event: Event) => {
    event.preventDefault();
    sudoku.reset();
    sudoku.generate();
    sudoku.startGame();
  });
