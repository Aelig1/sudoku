import Cell from "./cell";
import DuplicateEvent from "./duplicateEvent";

class Group extends EventTarget {
  #cells: Cell[];
  get cells(): Cell[] { return this.#cells; }

  #duplicate: DuplicateEvent = new DuplicateEvent("duplicate");

  constructor();
  constructor(cells: Cell[]);
  constructor(
    cells?: Cell[],
  ) {
    super();

    this.#cells = cells;
    for (const cell of cells) {
      cell.addEventListener("digitChange", () => this.#onDigitChange(cell));
    }
  }

  #onDigitChange = (cell: Cell) => {
    const duplicates = this.getDuplicateCells();
    if (!duplicates?.length) return;

    const event = new DuplicateEvent("duplicate", duplicates);
    this.dispatchEvent(event);
  };

  getDuplicateCells = (): Cell[] => {
    // Group cells by digit
    const groupDigits = new Map<string, Cell[]>();

    for (const cell of this.#cells) {
      const digit = cell.digit;
      if (!digit) continue; // Empty cell

      let found = groupDigits.get(digit);
      if (!found) {
        found = []; // Digit not found yet, add to groupDigits
        groupDigits.set(digit, found);
      }
      found.push(cell); // Add cell to digit's array
    }

    return Array
      .from(groupDigits.values())
      .filter(cells => cells.length > 1)
      .flat();
  };
}

export default Group;
