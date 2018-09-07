export interface IMember {
  dateCreated: string;
  createdBy: string;
  id?: string;
  authId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: 'male' | 'female';
  phoneNumber?: string;
  birthdate?: string;
  address?: string;
  photoURL?: string;
  note?: string;
}
