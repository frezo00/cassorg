import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Login, FirebaseUpdateProfile } from '../../models';

@Injectable()
export class AuthService {
  constructor(private af: AngularFireAuth) {}

  getAuthState(): Observable<any> {
    return this.af.authState;
  }

  login(loginData: Login): Promise<any> {
    return this.af.auth.signInWithEmailAndPassword(
      loginData.email,
      loginData.password
    );
  }

  register(email: string, password: string): Promise<any> {
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  signOut(): Promise<any> {
    return this.af.auth.signOut();
  }

  updateProfile(
    firebaseUpdateProfileData: FirebaseUpdateProfile
  ): Promise<any> {
    return this.af.auth.currentUser.updateProfile(firebaseUpdateProfileData);
  }

  sendVerificationEmail(): Promise<any> {
    return this.af.auth.currentUser.sendEmailVerification();
  }
}
