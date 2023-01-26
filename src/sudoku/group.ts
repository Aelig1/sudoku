import Cell from "./cell";
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
      cell.addToGroup(this);
    }
  }
}

export default Group;
