export interface IUser {
  displayName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: 'male' | 'female' | null;
  phoneNumber?: string;
  birthdate?: Date;
  address?: string;
  photoURL?: string;
  id?: string;
  authId?: string;
  emailVerified?: boolean;
  createdProject?: string;
  lastProjectLogin?: string;
  userOfProjects?: { projectId: string; role: 'admin' | 'member' }[];
  // userOfProjects?: Array<{projectId: string, role: 'admin' | 'member'}>;
}

export interface IProjectUser {
  user: IUser;
  projectID: string;
  role: 'admin' | 'member';
  createdAt?: Date;
  lastLogin?: Date;
  createdByAdmin?: string;
}

export class User implements IUser {
  constructor(
    public displayName: string,
    public email: string,
    public firstName?: string,
    public lastName?: string,
    public gender?: 'male' | 'female' | null,
    public phoneNumber?: string,
    public birthdate?: Date,
    public address?: string,
    public photoURL?: string,
    public id?: string,
    public authId?: string,
    public emailVerified?: boolean,
    public createdProject?: string,
    public lastProjectLogin?: string,
    // public userOfProjects?: Array<{projectId: string, role: 'admin' | 'member'}>
    public userOfProjects?: { projectId: string; role: 'admin' | 'member' }[]
  ) {}

  public get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
}
