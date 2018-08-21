import { INotification } from '.';

export interface IProject {
  name: string;
  tag: string;
  createdBy: string;
  createdAt: Date;
  id?: string;
  administrators?: string[];
  members?: string[];
  notifications?: INotification[];
}

export class Project {
  constructor(
    public name: string,
    public tag: string,
    public createdBy: string,
    public createdAt: Date,
    public id?: string,
    public administrators?: string[],
    public members?: string[],
    public notifications?: INotification[]
  ) {}
}
