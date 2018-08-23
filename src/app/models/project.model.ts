import { INotification } from '.';

export interface IProject {
  name: string;
  tag: string;
  createdBy: string;
  createdAt: string;
}

export interface IProjectWithID extends IProject {
  id: string;
}

export interface IProjectAllData extends IProjectWithID {
  administrators?: string[];
  members?: string[];
  notifications?: INotification[];
}

export class Project {
  constructor(
    public name: string,
    public tag: string,
    public createdBy: string,
    public createdAt: string,
    public id?: string,
    public administrators?: string[],
    public members?: string[],
    public notifications?: INotification[]
  ) {}
}
