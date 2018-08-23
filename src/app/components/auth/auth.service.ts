import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private af: AngularFireAuth) {}

  getAuthState(): Observable<any> {
    return this.af.authState;
  }

  login(email: string, password: string): Promise<any> {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string): Promise<any> {
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  signOut(): Promise<any> {
    return this.af.auth.signOut();
  }

  updateProfile(displayName: string, photoURL: string): Promise<any> {
    return this.af.auth.currentUser.updateProfile({ displayName, photoURL });
  }

  sendVerificationEmail(): Promise<any> {
    return this.af.auth.currentUser.sendEmailVerification();
  }
}
