import { Base } from './base.model';

export interface ITodo {
  name: string;
  id: number;
  createdDate: Date;
  updatedDate: Date;
}

export default class Todo extends Base <ITodo> {
  public static link = 'todo';

  public static title = 'Todo';
}
