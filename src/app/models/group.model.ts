export interface IGroup {
  id?: string;
  name: string;
  color: string;
  dateCreated: string;
  createdBy?: string;
  members?: any;
  activities?: string[];
  lastUpdated?: string;
}

export interface IMemberGroup {
  id: string;
  name: string;
  color: string;
  memberCount: string;
}

export class Group implements IGroup {
  constructor(
    public name: string,
    public color: string,
    public dateCreated: string,
    public id?: string,
    public createdBy?: string,
    public members?: any,
    public activities?: string[],
    public lastUpdated?: string
  ) {}
}
