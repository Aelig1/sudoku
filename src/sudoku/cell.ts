import "./sudoku.css";

class Cell extends EventTarget {
  #element: Element;
  get element(): Element { return this.#element; }

  #digit: string;
  get digit(): string { return this.#digit; }
  set digit(digit: string) {
    this.#digit = digit;
    this.#element.innerHTML = digit || "";
  }

  #select: Event = new Event("select");

  constructor();
  constructor(element: Element);
  constructor(
    element?: Element,
  ) {
    super();

    this.#element = element || document.createElement("td");
    this.#element.classList.add("sudoku-cell");

    this.#element.addEventListener("click", () => this.select());
  }

  select() {
    this.#element.classList.add("sudoku-selected");
    this.dispatchEvent(this.#select);
  }

  deselect() {
    this.#element.classList.remove("sudoku-selected");
  }
}

export default Cell;
