import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start.component';
import { materialModule } from '../material.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', component: StartComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        materialModule,
        CommonModule
    ],
    exports: [RouterModule],
    declarations: [StartComponent]
})
export class startRoutingModule { }
