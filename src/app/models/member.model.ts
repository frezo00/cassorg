export interface IMember {
  id?: string;
  authId?: string;
  createdBy?: string;
  dateCreated?: string;
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
  applicantId?: string;
  lastUpdated?: string;
}
