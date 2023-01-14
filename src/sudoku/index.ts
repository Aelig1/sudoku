import Cell from "./cell";
import "./sudoku.scss";

class Sudoku {
  #element: Element;
  get element(): Element { return this.#element; }

  #selectedCell: Cell;

  constructor();
  constructor(element: Element);
  constructor(
    element?: Element,
  ) {
    this.#element = element || document.createElement("div");
    this.#element.classList.add("sudoku");
    this.#buildTable();
  }

  #buildTable() {
    const table = document.createElement("table");
    table.classList.add("sudoku-table");
    this.#element.appendChild(table);

    const tableBody = document.createElement("tbody");
    table.appendChild(tableBody);

    // Create a 9x9 grid
    for (let y = 0; y < 9; y++) {
      const row = document.createElement("tr");
      tableBody.appendChild(row);

      for (let x = 0; x < 9; x++) {
        const cell = new Cell();
        row.appendChild(cell.element);

        cell.addEventListener("select", (event) => this.#onCellSelect(event.target as Cell));
      }
    }
  }

  #onCellSelect(cell: Cell) {
    if (this.#selectedCell && this.#selectedCell != cell) {
      this.#selectedCell.deselect();
    }
    this.#selectedCell = cell;
  }
}

export default Sudoku;
