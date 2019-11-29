import { NgModule } from '@angular/core';
import { ModaloptionComponent } from '../modaloption/modaloption.component';
import { materialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {WebcamModule} from 'ngx-webcam';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        WebcamModule,
        materialModule
    ],
    declarations: [ModaloptionComponent],
    entryComponents: [ModaloptionComponent]
})
export class MyComponentModule { }