import { ERoles } from '../../commons/enum/common';

export interface IUser {
  userId: string;
  email: string;
  passwordHash: string;
  role: ERoles;
}
