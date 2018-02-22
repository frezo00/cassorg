import { ICategory, INotification } from '.';

export interface IProject {
  name: string;
  createdBy: string;
  admins: string[];
  categories?: ICategory[];
  notifications?: INotification[];
}

export class Project {
  constructor(
    public name: string,
    public createdBy: string,
    public admins: string[],
    public categories?: ICategory[],
    public notifications?: INotification[]
  ) {}
}
