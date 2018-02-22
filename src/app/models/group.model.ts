import { IUser, IActivity } from '.';

export interface IGroup {
  name: string;
  activities?: IActivity[];
  users?: IUser[];
}

export class Group {
  constructor(
    public name: string,
    public activities?: IActivity[],
    public users?: IUser[]
  ) {}
}
