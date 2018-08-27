import { INotification } from '.';

export interface IProject {
  name: string;
  tag: string;
  createdBy: string;
  createdAt: string;
  users?: IProjectUser[];
  notifications?: INotification[];
}

export interface IProjectUser {
  userId: string;
  role: 'admin' | 'member';
  createdAt?: string;
  lastLogin?: string;
  createdByAdmin?: string;
}

export class Project {
  constructor(
    public name: string,
    public tag: string,
    public createdBy: string,
    public createdAt: string,
    public users?: IProjectUser[],
    public notifications?: INotification[]
  ) {}
}
