import { ICategory, INotification } from '.';

export interface IProject {
  name: string;
  createdBy: string;
  id?: string;
  administrators?: string[];
  categories?: ICategory[];
  notifications?: INotification[];
}

export class Project {
  constructor(
    public name: string,
    public createdBy: string,
    public id?: string,
    public administrators?: string[],
    public categories?: ICategory[],
    public notifications?: INotification[]
  ) {}
}
