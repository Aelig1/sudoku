import CellEvent from "./cellEvent";
import Group from "./group";
import Sudoku from ".";
import "./sudoku.scss";

class Cell extends EventTarget {
  #element: Element;
  get element(): Element { return this.#element; }

  #sudoku: Sudoku;
  get sudoku(): Sudoku { return this.#sudoku; }

  #groups: Set<Group>;
  get groups(): Set<Group> { return this.#groups; }

  #digit: string;
  get digit(): string { return this.#digit; }
  set digit(digit: string) {
    if (this.#isClue) return; // Setting digit not allowed if the cell is a clue

    this.#setDigit(digit);
    this.#checkErrors();
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
  constructor(sudoku: Sudoku, groups: Group[]);
  constructor(sudoku: Sudoku, groups: Group[], element: Element);
  constructor(
    sudoku: Sudoku,
    groups?: Group[],
    element?: Element,
  ) {
    super();

    this.#sudoku = sudoku;
    this.#groups = new Set<Group>(groups);

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

  addToGroup(group: Group) {
    this.#groups.add(group);
  }

  removeFromGroup(group: Group) {
    this.#groups.delete(group);
  }

  #setDigit(digit: string) {
    this.#digit = digit;
    this.#element.innerHTML = digit || "";
    this.dispatchEvent(new Event("digitChange"));
  }

  #checkErrors() {
    const errors = this.#sudoku.rules.checkErrors(this);
    if (!errors?.length) return;

    const event = new CellEvent("error", [...errors, this]);
    this.dispatchEvent(event);
  }
}

export default Cell;
