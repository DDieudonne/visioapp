import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatSlideToggleModule, MatProgressSpinnerModule, MatTooltipModule, MatSnackBarModule, MatDialogModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatToolbarModule, MatListModule, MatStepperModule, MatAutocompleteModule, MatCheckboxModule, MatSelectModule, MatProgressBarModule } from '@angular/material';


@NgModule({
    imports: [
        MatNativeDateModule ,
        MatDatepickerModule,
        MatDatepickerModule,
        MatMenuModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatSlideToggleModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatStepperModule,
        MatAutocompleteModule,
        MatListModule,
        MatSelectModule,
        MatSidenavModule,
        MatProgressBarModule,
        MatCheckboxModule
    ],
    exports: [
        MatNativeDateModule ,
        MatDatepickerModule,
        MatMenuModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatSlideToggleModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatStepperModule,
        MatAutocompleteModule,
        MatListModule,
        MatSelectModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatCheckboxModule
    ]
})
export class materialModule { }