import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  private imgs = ['1', '2', '3', '4'];
  private imgId;

  private $dataUserSub: Subscription;

  constructor(
    private authentificationService: AuthentificationService
  ) { }

  ngOnInit() {
    this.imgId = Math.floor(Math.random() * this.imgs.length);
    console.log('imgId',this.imgId)
    this.$dataUserSub = this.authentificationService.userDataSub().subscribe(data => {
      console.log('data',data)
    });
  }
  modalOpen(state) {
    switch (state) {
      case "login":
        this.authentificationService.modalSubShow.next(state)
        break;
      case "newsession":
        this.authentificationService.modalSubShow.next(state)
        break;
      case "newaccount":
        this.authentificationService.modalSubShow.next(state)
        break;
    }
  }

  ngOnDestroy(): void {
    this.$dataUserSub != null ? this.$dataUserSub.unsubscribe() : null;
  }

}
