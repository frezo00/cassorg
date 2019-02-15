import { IGroup } from './group.model';

export interface IActivity {
  title: string;
  description: string;
  date: string;
  group: string | IGroup;
  id?: string;
  members?: { [id: string]: boolean };
  createdBy?: string;
  dateCreated?: string;
}

export class Activity {
  constructor(
    public title: string,
    public description: string,
    public date: string,
    public group: string | IGroup,
    public id?: string,
    public members?: { [id: string]: boolean },
    public createdBy?: string,
    public dateCreated?: string
  ) {}
}
