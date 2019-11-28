import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { v4 as uuid } from 'uuid';

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
  private idSeesion :string;

  constructor(
    private dialogRef: MatDialogRef<ModaloptionComponent>,
    private authentificationService: AuthentificationService,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.idSeesion = uuid();
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
    }

  }

  createAccount(formLogin: FormGroup) {
    let objectUser = {
      lastname: formLogin.value.lastNameControl,
      firstname: formLogin.value.firstNameControl,
      email: formLogin.value.mailControl,
      uid: null,
      hasAvatar: false
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
    // formLogin.value.passControl
  }

  close(state?) {
    this.dialogRef.close(state);
  }

}
