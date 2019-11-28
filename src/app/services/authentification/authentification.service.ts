import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

declare var Peer: any;
@Injectable({ providedIn: 'root' })
export class AuthentificationService {

  public modalSubShow = new Subject<any>();
  public refreshListSession = new Subject<any>();
  private userData: Observable<firebase.User>;
  private peer = new Peer();
  private ref = firebase.firestore().collection('users');
  private refMySessions = firebase.firestore().collection('mysessions');
  private myId;
  private user;
  private arraySessions = [];

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.userData = angularFireAuth.authState;
    this.userData.subscribe(data => {
      this.setMyId(data.uid);
      this.getMyUser().subscribe(data => {
        this.setAllMyData(data);
        this.setListMySession();
      });
    });
  }

  setListMySession() {
    this.arraySessions.splice(0, this.arraySessions.length);
    this.getMySessions(this.getMyID()).subscribe(dataSess => {
      this.arraySessions.indexOf(dataSess.idSession) == -1 ? this.arraySessions.push(dataSess) : null;
    });
  }

  getListMySession() {
    console.log('arraySessions',this.arraySessions)
    return this.arraySessions;
  }

  setMyId(myId) {
    this.myId = myId;
  }

  setAllMyData(data) {
    this.user = data;
  }

  getUserData() {
    return this.user;
  }

  getMyID() {
    return this.myId;
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

  SendVerificationMail() {
    return this.angularFireAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        // this.router.navigate(['verify-email-address']);
      })
  }

  ForgotPassword(passwordResetEmail) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  SignOut(): Promise<any> {
    return new Promise(resolve => {
      this.angularFireAuth
        .auth
        .signOut().then(() => {
          resolve(true);
          this.router.navigateByUrl('/start');
        }).catch(() => {
          resolve(true);
          this.router.navigateByUrl('/start');
        });
    });
  }

  emailValidator(control: FormControl) {
    let EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return EMAIL_REGEXP.test(control.value) ? null : { invalidEmailAddress: true }
  }

  createUser(dataObject): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("users").doc(dataObject.uid).set(dataObject)
        .then(res => {
          resolve(true)
        }, err => reject(err));
    });
  }

  createMySession(dataObject): Promise<any> {
    dataObject.pass = CryptoJS.AES.encrypt(dataObject.pass, environment.keyCrypt).toString();
    console.log('dataObject',dataObject)
    // let passD =  CryptoJS.AES.decrypt(pass, environment.keyCrypt).toString(CryptoJS.enc.Utf8)
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection(`mysessions`).doc(dataObject.user.uid).collection(dataObject.user.uid).add(dataObject)
        .then(res => {
          resolve(true);
        }, err => reject(err));
    });
  }

  createSessionWorld(dataObject): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("sessionsworld").doc(dataObject.uid).set(dataObject)
        .then(res => {
          resolve(true)
        }, err => reject(err));
    });
  }

  userDataSub() {
    return this.userData;
  }

  getAllUSers(): Observable<any> {
    return new Observable((observer) => {
      this.ref.onSnapshot((querySnapshot) => {
        let users = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          users.push({
            key: doc.id,
            email: data.email,
            firstname: data.firstname,
            hasAvatar: data.hasAvatar,
            lastname: data.lastname,
            uid: data.uid
          });
        });
        observer.next(users);
      });
    });
  }

  getMySessions(dataUserId): Observable<any> {
    return new Observable((observer) => {
      this.refMySessions.doc(dataUserId).collection(dataUserId).get().then(da => {
        da.forEach(d => {
          let data = d.data();
          observer.next({
            idSession: data.idSession,
            date: data.date,
            pass: data.pass,
            creator: data.user
          });
        });
      })
    });
  }

  getMyUser(): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(this.getMyID()).get().then((doc) => {
        let data = doc.data();
        observer.next({
          key: doc.id,
          email: data.email,
          firstname: data.firstname,
          hasAvatar: data.hasAvatar,
          lastname: data.lastname,
          uid: data.uid
        });
      });
    });
  }

  getPeerInit(): Observable<any> {
    return new Observable((observer) => {
      observer.next(this.peer);
      observer.complete();
    });
  }

}
