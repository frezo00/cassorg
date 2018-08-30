export interface IGroup {
  name: string;
  color: string;
  users?: string[];
  activities?: string[];
}

export class Group implements IGroup {
  constructor(
    public name: string,
    public color: string,
    public users?: string[],
    public activities?: string[]
  ) {}
}
