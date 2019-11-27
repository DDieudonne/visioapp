import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModaloptionComponent } from './modaloption/modaloption.component';
import { Subscription } from 'rxjs';
import { AuthentificationService } from './services/authentification/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private $dialogSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private authentificationService: AuthentificationService
  ) {

    this.$dialogSub = this.authentificationService.modalSubShow.subscribe(data => {
      const dialogRef = this.dialog.open(ModaloptionComponent, {
        disableClose: true,
        data: { type: data }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });


  }
  ngOnDestroy() {

  }
}
