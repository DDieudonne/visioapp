import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModaloptionComponent } from './modaloption/modaloption.component';
import { Subscription } from 'rxjs';
import { AuthentificationService } from './services/authentification/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private $dialogSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authentificationService: AuthentificationService
  ) {

    this.$dialogSub = this.authentificationService.modalSubShow.subscribe(data => {
      const dialogRef = this.dialog.open(ModaloptionComponent, {
        disableClose: true,
        data: { type: data }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        switch (result) {
          case "login": case "create":
          this.router.navigate(['/chat']);
            break;
          case "newsession":

            break;
        }
      });
    });


  }
  ngOnDestroy() {

  }
}
