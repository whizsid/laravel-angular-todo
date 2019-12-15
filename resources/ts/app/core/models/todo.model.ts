import { Base } from './base.model';
import { Moment } from 'moment';

export interface ITodo {
  name: string;
  id: number;
  createdDate: Moment;
  updatedDate: Moment;
}

export default class Todo extends Base <ITodo> {
  public static link = 'todo';

  public static title = 'Todo';
}
