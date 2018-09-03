export interface IUserLogin {
  authId: string;
  email: string;
  displayName?: string;
}

export interface IUser {
  id?: string;
  authId?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: 'male' | 'female' | null;
  phoneNumber?: string;
  birthdate?: string;
  address?: string;
  photoURL?: string;
  emailVerified?: boolean;
  userOfProjects?: string[];
  createdProject?: string;
  lastProjectLogin?: string;
}

export interface IApplicant {
  firstName: string;
  lastName: string;
  birthdate: any;
  parentsNames: string;
  phoneNumber: string;
  dateCreated: any;
  id?: string;
  email?: string;
  message?: string;
  recaptcha?: string;
}

export class User implements IUser {
  constructor(
    public authId: string,
    public displayName: string,
    public email: string,
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public gender?: 'male' | 'female' | null,
    public phoneNumber?: string,
    public birthdate?: string,
    public address?: string,
    public photoURL?: string,
    public emailVerified?: boolean,
    public userOfProjects?: string[],
    public createdProject?: string,
    public lastProjectLogin?: string
  ) {}

  public get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
}
