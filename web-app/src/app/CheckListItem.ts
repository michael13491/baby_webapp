export class CheckListItem {
  title: string = '';
  complete: boolean = false;
  key: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
