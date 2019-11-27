import { NgModule } from '@angular/core';
import { ModaloptionComponent } from '../modaloption/modaloption.component';
import { materialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        materialModule
    ],
    declarations: [ModaloptionComponent],
    entryComponents: [ModaloptionComponent]
})
export class MyComponentModule { }