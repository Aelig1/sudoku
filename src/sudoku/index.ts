const Cell = class {
  #element: Element;
  get element(): Element { return this.#element; }

  #digit: string;
  get digit(): string { return this.#digit; }
  set digit(digit: string) {
    this.#digit = digit;
    this.#element.innerHTML = digit || "";
  }

  constructor();
  constructor(element: Element);
  constructor(
    element?: Element,
  ) {
    this.#element = element || document.createElement("td");
  }
};

const Sudoku = class {
  #element: Element;
  get element(): Element { return this.#element; }

  constructor();
  constructor(element: Element);
  constructor(
    element?: Element,
  ) {
    this.#element = element || document.createElement("div");
    this.#buildTable();
  }

  #buildTable() {
    const table = document.createElement("table");
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
      }
    }
  }
};

export default Sudoku;
