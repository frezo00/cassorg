export interface IUser {
  displayName: string;
  email: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  gender?: 'male' | 'femele' | null;
  emailVerified?: boolean;
  phoneNumber?: string;
  birthday?: string;
  photoURL?: string;
  createdAt?: string;
  lastLogin?: string;
}

export class User implements IUser {
  constructor(
    public displayName: string,
    public email: string,
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public gender?: 'male' | 'femele',
    public emailVerified?: boolean,
    public phoneNumber?: string,
    public birthday?: string,
    public photoURL?: string,
    public createdAt?: string,
    public lastLogin?: string
  ) {}
}
