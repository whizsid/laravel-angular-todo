import { Base } from './base.model';

export interface IUser {
  name: string;
  email: string;
  id?: number;
  createdDate: Date;
  updatedDate: Date;
  avatarUrl: string;
}

export default class User extends Base<IUser> {
  public static link = 'user';

  public static title = 'User';
}
