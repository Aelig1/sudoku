import "./sudoku.scss";

class Cell extends EventTarget {
  #element: Element;
  get element(): Element { return this.#element; }

  #digit: string;
  get digit(): string { return this.#digit; }
  set digit(digit: string) {
    if (!this.#isClue) {
      this.#setDigit(digit); // Setting digit not allowed if the cell is a clue
    }
  }

  #isClue: boolean;
  get isClue(): boolean { return this.#isClue; }
  set clue(digit: string) {
    const hasValue = !!digit;
    if (!hasValue && !this.#isClue) {
      return; // If the clue is emptied and it was not a clue before, do nothing (preserves user entered digit)
    }

    this.#setDigit(digit);
    this.#isClue = hasValue;
    this.#element.classList.toggle("sudoku-clue", this.#isClue);
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

  reset() {
    this.#setDigit(undefined);
    this.clue = undefined;
  }

  #setDigit(digit: string) {
    this.#digit = digit;
    this.#element.innerHTML = digit || "";
  }
}

export default Cell;
