import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  private imgs = ['1', '2', '3', '4', '5', '6', '7', '8'];
  private imgId;
  private userOnline;
  private userData;

  private $dataUserSub: Subscription;

  constructor(
    private authentificationService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.imgId = Math.floor(Math.random() * this.imgs.length);
    this.$dataUserSub = this.authentificationService.userDataSub().subscribe(data => {
      this.userOnline = data;
      setTimeout(() => {
        this.userData = this.authentificationService.getUserData();
        console.log('userData',this.userData)
      }, 3000);
      this.authentificationService.getUserData();
    });
  }

  modalOpen(state) {
    switch (state) {
      case "login":
        this.authentificationService.modalSubShow.next(state);
        break;
      case "newsession":
        this.authentificationService.modalSubShow.next(state);
        break;
      case "newaccount":
        this.authentificationService.modalSubShow.next(state);
        break;
    }
  }

  dashboard(){
    this.router.navigate(['/chat']);
  }

  ngOnDestroy(): void {
    this.$dataUserSub != null ? this.$dataUserSub.unsubscribe() : null;
  }

}
