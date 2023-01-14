import "./sudoku.css";

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
    this.#element.classList.add("sudoku-cell");
  }
};

export default Cell;
