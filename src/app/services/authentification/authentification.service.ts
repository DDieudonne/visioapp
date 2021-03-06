import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  public modalSubShow = new Subject<any>();
  private userData: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.userData = angularFireAuth.authState;
  }

  SignUp(email: string, password: string): Promise<any> {
    return new Promise(resolve => {
      this.angularFireAuth
        .auth
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          resolve(error.message);
        });
    });
  }

  SignIn(email: string, password: string): Promise<any> {
    return new Promise(resolve => {
      this.angularFireAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(true);
        })
        .catch(err => {
          resolve(err.message);
        });
    });
  }

  SignOut() {
    this.angularFireAuth
      .auth
      .signOut();
  }

  emailValidator(control: FormControl) {
    let EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return EMAIL_REGEXP.test(control.value) ? null : { invalidEmailAddress: true }
  }

  createUser(data): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("users/" + data.uid)
        .add(data)
        .then(res => {
          resolve(true)
        }, err => reject(err));
    });
  }

  userDataSub() {
    return this.userData;
  }


}
