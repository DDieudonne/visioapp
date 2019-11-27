import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
import { AuthentificationService } from './services/authentification/authentification.service';
import { ModaloptionComponent } from './modaloption/modaloption.component';
import { materialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    ModaloptionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    materialModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule
  ],
  providers: [AuthentificationService,AngularFirestore],
  bootstrap: [AppComponent],
  entryComponents: [ModaloptionComponent]
})
export class AppModule { }
