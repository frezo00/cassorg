export interface IMember {
  dateCreated: string;
  id?: string;
  authId?: string;
  createdBy?: string;
  firstName?: string;
  lastName?: string;
  birthdate?: string;
  phoneNumber?: string;
  parents?: string;
  gender?: 'male' | 'female' | null;
  email?: string;
  address?: string;
  photoURL?: string;
  note?: string;
  siblings?: string[];
}
