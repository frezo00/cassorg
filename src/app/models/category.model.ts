import { IGroup, IUser } from '.';

export interface ICategory {
  name: string;
  groups?: IGroup[];
  users?: IUser[];
}

export class Category {
  constructor(
    public name: string,
    public groups?: IGroup[],
    public users?: IUser[]
  ) {}
}
