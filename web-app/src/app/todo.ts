export class Todo {
  id: number;
  title: string = '';
  complete: boolean = false;
  key: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
