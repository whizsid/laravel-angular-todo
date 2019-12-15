import { Base } from './base.model';
import {Moment} from 'moment';

export interface IUser {
  name: string;
  email: string;
  id?: number;
  createdDate: Moment;
  updatedDate: Moment;
  avatarUrl: string;
}

export default class User extends Base<IUser> {
  public static link = 'user';

  public static title = 'User';
}
