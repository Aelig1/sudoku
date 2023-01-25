import Cell from "./cell";
import CellEvent from "./cellEvent";
import Sudoku from ".";

class Group extends EventTarget {
  #sudoku: Sudoku;
  get sudoku(): Sudoku { return this.#sudoku; }

  #cells: Cell[];
  get cells(): Cell[] { return this.#cells; }

  constructor(sudoku: Sudoku);
  constructor(sudoku: Sudoku, cells: Cell[]);
  constructor(
    sudoku: Sudoku,
    cells?: Cell[],
  ) {
    super();

    this.#sudoku = sudoku;
    this.#cells = cells;
    for (const cell of cells) {
      cell.addEventListener("digitChange", () => this.#onDigitChange(cell));
    }
  }

  #onDigitChange = (cell: Cell) => {
    const errorCells = this.#sudoku.rules.getErrorCells(this);
    if (!errorCells?.length) return;

    const event = new CellEvent("error", errorCells);
    this.dispatchEvent(event);
  };
}

export default Group;
