import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { v4 as uuid } from 'uuid'
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-modaloption',
  templateUrl: './modaloption.component.html',
  styleUrls: ['./modaloption.component.scss']
})
export class ModaloptionComponent implements OnInit {

  private lastNameControl: FormControl;
  private firstNameControl: FormControl;
  private mailControl: FormControl;
  private passControl: FormControl;
  private formLogin: FormGroup;
  private loading: boolean;
  private shareWith: boolean;
  private idSession: string;

  private showWebcam = true;
  private allowCameraSwitch = true;
  private multipleWebcamsAvailable = false;
  private deviceId: string;
  private videoOptions: MediaTrackConstraints = {
    width: { ideal: 1024 },
    height: { ideal: 576 }
  };

  private errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  constructor(
    private dialogRef: MatDialogRef<ModaloptionComponent>,
    private authentificationService: AuthentificationService,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.idSession = uuid();
    this.lastNameControl = new FormControl('', Validators.compose([Validators.required]));
    this.firstNameControl = new FormControl('', Validators.compose([Validators.required]));
    this.passControl = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]));
    this.mailControl = new FormControl('', Validators.compose([Validators.required, this.authentificationService.emailValidator]));
    switch (this.data.type) {
      case "newaccount":
        this.formLogin = new FormGroup({
          lastNameControl: this.lastNameControl,
          firstNameControl: this.firstNameControl,
          mailControl: this.mailControl,
          passControl: this.passControl
        });
        break;
      case "login":
        this.formLogin = new FormGroup({
          mailControl: this.mailControl,
          passControl: this.passControl
        });
        break;
      case "newsession":
        this.formLogin = new FormGroup({
          passControl: this.passControl
        });
        break;
      case "webcam":
        // WebcamUtil.getAvailableVideoInputs()
        //   .then((mediaDevices: MediaDeviceInfo[]) => {
        //     this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
        //   });
        break;
    }

  }

  createAccount(formLogin: FormGroup) {
    let objectUser = {
      lastname: formLogin.value.lastNameControl,
      firstname: formLogin.value.firstNameControl,
      email: formLogin.value.mailControl,
      uid: null,
      hasAvatar: false,
      photoURL : ""
    }
    this.loading = true;
    if (formLogin.status == "VALID") {
      this.authentificationService.SignUp(formLogin.value.mailControl, formLogin.value.passControl).then(data => {
        objectUser.uid = data.user.uid;
        this.authentificationService.createUser(objectUser).then(() => {
          this.loading = false;
          this.close("create")
        }).catch(() => {
          this.loading = false;
        });
      });
    } else {
      this.loading = false;
    }
  };


  logiAccount(formLogin: FormGroup) {
    this.loading = true;
    if (formLogin.status == "VALID") {
      this.authentificationService.SignIn(formLogin.value.mailControl, formLogin.value.passControl).then(data => {
        this.close("login");
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }


  createNewSession(formLogin: FormGroup) {

    let date = new Date(
      Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        new Date().getUTCHours(),
        new Date().getUTCMinutes()
      ))

    this.loading = true;
    let object = {
      idSession: this.idSession,
      pass: formLogin.value.passControl,
      date: date,
      user: this.authentificationService.getUserData()
    }
    this.authentificationService.createMySession(object).then(data => {
      console.log('ERROR CRETE',data)
      if (data) {
        this.loading = false;
        this.shareWith = true;
        this.authentificationService.setListMySession();
      } else {
        this.loading = false;
        this.shareWith = false;
      }
    }).catch((err) => {
      console.log('ERROR CRETE',err)
      this.loading = false;
      this.shareWith = false;
    })
  }

  close(state?) {
    this.dialogRef.close(state);
  }

  // WEBCAM
  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }
  public handleImage(webcamImage: WebcamImage): void {
    
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  // WEBCAM

}
