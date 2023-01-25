import Cell from "./cell";
import DuplicateEvent from "./duplicateEvent";
import Group from "./group";
import SudokuRules, { defaultRules } from "./sudokuRules";
import "./sudoku.scss";

class Sudoku {
  #element: Element;
  get element(): Element { return this.#element; }

  #cells: Cell[] = [];
  #selectedCell: Cell;

  #groups: Group[] = [];

  #options: SudokuRules = defaultRules;

  constructor();
  constructor(element: Element);
  constructor(element: Element, options: SudokuRules);
  constructor(
    element?: Element,
    options?: SudokuRules,
  ) {
    this.#element = element || document.createElement("div");
    this.#element.classList.add("sudoku");

    // Override options
    this.#options = { ...this.#options, ...options };

    this.#buildTable();

    document.addEventListener("keydown", (event) => this.#onKeyDown(event));
  }

  reset() {
    for (const cell of this.#cells) {
      cell.reset();
      cell.deselect();
    }
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
        const cell = new Cell();
        cells.push(cell);
        row.appendChild(cell.element);

        // DEBUG
        if (Math.random() > .7) cell.clue = Math.ceil(Math.random() * 9).toString();

        cell.addEventListener("select", (event) => this.#onCellSelect(event.target as Cell));
      }
    }

    this.#cells = cells;
  }

  #buildGroups() {
    const groups: Group[] = [];

    for (const groupIndices of this.#options.groups) {
      const groupCells = groupIndices.map(i => this.#cells[i]);
      const group = new Group(groupCells);
      group.addEventListener("duplicate", (event) => this.#onDuplicate(event as DuplicateEvent));
      groups.push(group);
    }

    this.#groups = groups;
  }

  #onDuplicate(event: DuplicateEvent) {
    for (const cell of event.duplicates) {
      cell.element.classList.add("sudoku-duplicate");
    }
  }

  #onCellSelect(cell: Cell) {
    if (this.#selectedCell && this.#selectedCell != cell) {
      this.#selectedCell.deselect();
    }
    this.#selectedCell = cell;
  }

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
    let allowedDigits = this.#options?.allowedDigits;
    if (!allowedDigits) return true; // Anything goes

    if (typeof allowedDigits === "string") {
      allowedDigits = allowedDigits.split(""); // Convert allowed digits to an array
    }

    return allowedDigits.includes(digit);
  }

  #isClearKey(key: string) {
    return ["0", "Backspace", "Delete"].includes(key);
  }
}

export default Sudoku;
