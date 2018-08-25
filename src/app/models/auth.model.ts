export interface Register {
  fullName: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface AuthError {
  type: string;
  message: string;
}

export interface FirebaseAuthError {
  code: string;
  message: string;
}

export interface FirebaseUpdateProfile {
  displayName: string;
  photoURL: string;
}
