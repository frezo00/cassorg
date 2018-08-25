export interface IUserLogin {
  authId: string;
  email: string;
  displayName?: string;
}

export class UserLogin implements IUserLogin {
  constructor(
    public authId: string,
    public email: string,
    public displayName?: string
  ) {}
}

export interface IUser extends IUserLogin {
  firstName?: string;
  lastName?: string;
  gender?: 'male' | 'female' | null;
  phoneNumber?: string;
  birthdate?: string;
  address?: string;
  photoURL?: string;
  emailVerified?: boolean;
  createdProject?: string;
  lastProjectLogin?: string;
  userOfProjects?: { projectId: string; role: 'admin' | 'member' }[];
  // userOfProjects?: Array<{projectId: string, role: 'admin' | 'member'}>;
}

export class User implements IUser {
  constructor(
    public authId: string,
    public displayName: string,
    public email: string,
    public firstName?: string,
    public lastName?: string,
    public gender?: 'male' | 'female' | null,
    public phoneNumber?: string,
    public birthdate?: string,
    public address?: string,
    public photoURL?: string,
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

export interface IProjectUser {
  user: IUser;
  projectID: string;
  role: 'admin' | 'member';
  createdAt?: string;
  lastLogin?: string;
  createdByAdmin?: string;
}
