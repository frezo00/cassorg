export interface IGroup {
  name: string;
  color: string;
  dateCreated: string;
  createdBy?: string;
  members?: string[];
  activities?: string[];
}

export class Group implements IGroup {
  constructor(
    public name: string,
    public color: string,
    public dateCreated: string,
    public createdBy?: string,
    public members?: string[],
    public activities?: string[]
  ) {}
}
