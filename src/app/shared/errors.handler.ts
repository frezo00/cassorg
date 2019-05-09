import { AuthError } from '../models';

export function firebaseAuthErrorHandler(code: string) {
  let message = '';
  let type = '';
  switch (code) {
    case 'auth/invalid-email':
      message = 'Neispravan email.';
      type = 'Login';
      break;
    case 'auth/user-disabled':
      message = 'Korisnik blokiran.';
      type = 'Login';
      break;
    case 'auth/user-not-found':
      message = 'Korisnik nije pronađen.';
      type = 'Login';
      break;
    case 'auth/wrong-password':
      message = 'Pogrešna lozinka.';
      type = 'Login';
      break;
    case 'auth/email-already-in-use':
      message = 'Ovaj email se već koristi.';
      type = 'Register';
      break;
    case 'auth/invalid-email':
      message = 'Neispravan email.';
      type = 'Register';
      break;
    case 'auth/operation-not-allowed':
      message = 'Operacija nije dopuštena.';
      type = 'Register';
      break;
    case 'auth/weak-password':
      message = 'Preslaba lozinka.';
      type = 'Register';
      break;
    default:
      message = 'Dogodila se pogreška.';
      type = 'Error';
      break;
  }
  return { type: type, message: message } as AuthError;
}
