import Cell from "./cell";
import CellEvent from "./cellEvent";
import Group from "./group";
import SudokuRules, { defaultRules } from "./sudokuRules";
import "./sudoku.scss";

class Sudoku {
  #element: Element;
  get element(): Element { return this.#element; }

  #cells: Cell[] = [];
  #selectedCell: Cell;

  #groups: Group[] = [];

  #rules: SudokuRules;
  get rules(): SudokuRules { return this.#rules; }

  constructor();
  constructor(element: Element);
  constructor(element: Element, rules: SudokuRules);
  constructor(
    element?: Element,
    rules?: SudokuRules,
  ) {
    this.#element = element || document.createElement("div");
    this.#element.classList.add("sudoku");

    // Override rules
    this.#rules = { ...defaultRules, ...rules };

    this.#buildTable();
  }

  #buildTable() {
    const table = document.createElement("table");
    table.classList.add("sudoku-table");
    this.#element.appendChild(table);

    const tableBody = document.createElement("tbody");
    table.appendChild(tableBody);

    this.#buildCells(tableBody);
    this.#buildGroups();
  }

  #buildCells(parentElement: HTMLElement) {
    const cells: Cell[] = [];

    // Create a 9x9 grid
    for (let y = 0; y < 9; y++) {
      const row = document.createElement("tr");
      parentElement.appendChild(row);

      for (let x = 0; x < 9; x++) {
        const cell = new Cell(this);
        cells.push(cell);
        row.appendChild(cell.element);

        cell.addEventListener("select", (event) => this.#onCellSelect(event.target as Cell));
      }
    }

    this.#cells = cells;
  }

  #buildGroups() {
    const groups: Group[] = [];

    for (const groupIndices of this.#rules.groups) {
      const groupCells = groupIndices.map(i => this.#cells[i]);
      const group = new Group(this, groupCells);
      group.addEventListener("error", (event) => this.#onError(event as CellEvent));
      groups.push(group);
    }

    this.#groups = groups;
  }

  #onError(event: CellEvent) {
    // Highlight error cells
    for (const cell of event.cells) {
      cell.error = true;
    }
    // Handle error according to rules
    this.#rules.onError(this);
  }

  #onCellSelect(cell: Cell) {
    if (this.#selectedCell && this.#selectedCell != cell) {
      this.#selectedCell.deselect();
    }
    this.#selectedCell = cell;
  }

  #onKeyDownListener = (event: KeyboardEvent) => this.#onKeyDown(event);
  #onKeyDown(event: KeyboardEvent) {
    if (!this.#selectedCell) return; // No cell was selected

    const digit = event.key;
    if (this.isAllowedDigit(digit)) {
      event.preventDefault();
      this.#selectedCell.digit = digit;
    }
    else if (this.#isClearKey(digit)) {
      event.preventDefault();
      this.#selectedCell.digit = undefined; // Clear the cell
    }
  }

  isAllowedDigit(digit: string) {
    let allowedDigits = this.#rules?.allowedDigits;
    if (!allowedDigits) return true; // Anything goes

    if (typeof allowedDigits === "string") {
      allowedDigits = allowedDigits.split(""); // Convert allowed digits to an array
    }

    return allowedDigits.includes(digit);
  }

  #isClearKey(key: string) {
    return ["0", "Backspace", "Delete"].includes(key);
  }

  reset() {
    for (const cell of this.#cells) {
      cell.reset();
      cell.deselect();
    }
  }

  generate() {
    // DEBUG
    for (const cell of this.#cells) {
      if (Math.random() > .7) cell.clue = Math.ceil(Math.random() * 9).toString();
    }
  }

  startGame() {
    document.addEventListener("keydown", this.#onKeyDownListener);
  }

  endGame() {
    document.removeEventListener("keydown", this.#onKeyDownListener);
  }
}

export default Sudoku;
