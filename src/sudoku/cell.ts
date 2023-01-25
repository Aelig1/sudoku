import Sudoku from ".";
import "./sudoku.scss";

class Cell extends EventTarget {
  #element: Element;
  get element(): Element { return this.#element; }

  #sudoku: Sudoku;
  get sudoku(): Sudoku { return this.#sudoku; }

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

  #error: boolean;
  get error(): boolean { return this.#error; }
  set error(value: boolean) {
    this.#error = value;
    if (value) this.#element.classList.add("sudoku-error");
    else this.#element.classList.remove("sudoku-error");
  }

  constructor(sudoku: Sudoku);
  constructor(sudoku: Sudoku, element: Element);
  constructor(
    sudoku: Sudoku,
    element?: Element,
  ) {
    super();

    this.#sudoku = sudoku;

    this.#element = element || document.createElement("td");
    this.#element.classList.add("sudoku-cell");

    this.#element.addEventListener("click", () => this.select());
  }

  select() {
    this.#element.classList.add("sudoku-selected");
    this.dispatchEvent(new Event("select"));
  }

  deselect() {
    this.#element.classList.remove("sudoku-selected");
  }

  reset() {
    this.#setDigit(undefined);
    this.clue = undefined;
    this.error = false;
  }

  #setDigit(digit: string) {
    this.#digit = digit;
    this.#element.innerHTML = digit || "";
    this.dispatchEvent(new Event("digitChange"));
  }
}

export default Cell;
