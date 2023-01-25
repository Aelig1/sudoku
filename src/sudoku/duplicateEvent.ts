import Cell from "./cell";

class DuplicateEvent extends Event {
  duplicates: Cell[];

  constructor(name: string);
  constructor(name: string, duplicates: Cell[]);
  constructor(
    name: string,
    duplicates?: Cell[],
  ) {
    super(name);
    this.duplicates = duplicates;
  }
}

export default DuplicateEvent;
