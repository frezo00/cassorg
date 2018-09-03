export interface IGroup {
  name: string;
  color: string;
  dateCreated: string;
  createdBy?: string;
  users?: string[];
  activities?: string[];
}

export class Group implements IGroup {
  constructor(
    public name: string,
    public color: string,
    public dateCreated: string,
    public createdBy?: string,
    public users?: string[],
    public activities?: string[]
  ) {}
}
