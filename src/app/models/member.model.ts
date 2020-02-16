export interface IMember {
  id: string;
  authId: string;
  createdBy: string;
  dateCreated: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  phoneNumber: string;
  parents: string;
  gender: 'male' | 'female';
  email: string;
  address: string;
  photoURL: string;
  note: string;
  siblings: string[]; // TODO: This needs to be fixed
  applicantId: string;
  lastUpdated: string;
  groups: any; // TODO: This needs to be fixed
}

export class Member implements IMember {
  constructor(
    public id: string,
    public authId: string,
    public createdBy: string,
    public dateCreated: string,
    public firstName: string,
    public lastName: string,
    public birthdate: string,
    public phoneNumber: string,
    public parents: string,
    public gender: 'male' | 'female',
    public email: string,
    public address: string,
    public photoURL: string,
    public note: string,
    public siblings: string[],
    public applicantId: string,
    public lastUpdated: string,
    public groups: any
  ) {}

  get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
}
