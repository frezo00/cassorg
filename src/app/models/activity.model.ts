import { IUser, IGroup } from '.';

export interface IActivity {
  title: string;
  date: string;
  group: IGroup;
  description?: string;
  users?: IUser[];
}

export class Activity {
  constructor(
    public title: string,
    public date: string,
    public group: IGroup,
    public description?: string,
    public users?: IUser[]
  ) {}
}
