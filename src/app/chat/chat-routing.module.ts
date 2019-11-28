import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { materialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { MomentModule } from 'angular2-moment';

const routes: Routes = [
    { path: '', component: ChatComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        materialModule,
        MomentModule,
        CommonModule
    ],
    exports: [RouterModule],
    declarations: [ChatComponent]
})
export class ChatRoutingModule { }
