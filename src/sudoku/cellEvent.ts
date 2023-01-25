import Cell from "./cell";

class DuplicateEvent extends Event {
  cells: Cell[];

  constructor(name: string);
  constructor(name: string, cells: Cell[]);
  constructor(
    name: string,
    cells?: Cell[],
  ) {
    super(name);
    this.cells = cells;
  }
}

export default DuplicateEvent;
