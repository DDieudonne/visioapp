import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
    imports: [
        CommonModule,
        MomentModule,
        ChatRoutingModule
    ]
})
export class ChatModule { }
