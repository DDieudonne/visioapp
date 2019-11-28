import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification/authentification.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private arrayIconsText = [
    { name: "Mes rooms", icon: "meeting_room", type: "rooms", check: true },
    { name: "World Rooms", icon: "language", type: "world", check: false },
    { name: "Mon planning", icon: "event", type: "events", check: false },
    { name: "Mes paramètres", icon: "build", type: "parameters", check: false },
    { name: "Déconnexion", icon: "directions_run", type: "logout", out: true, check: false }
  ];
  private selected: string = "rooms";
  private peerId;
  private socket: any;

  constructor(private authentificationService: AuthentificationService) {
    this.socket = io("http://localhost:3000/");
  }

  ngOnInit() {
    this.authentificationService.getPeerInit().subscribe(peer => {
      this.peerId = peer.id;
    });
    // console.log('this.authentificationService.getMyID()',this.authentificationService.getMyID())
    // this.authentificationService.getAllUSers().subscribe(data => {
    //   console.log('data USERS', data)
    // });
  }

  selectCard(type) {
    this.selected = type;
    this.arrayIconsText.forEach(ico => {
      ico.check = false;
      if (type == ico.type) { ico.check = true };
    });
    if (type == "logout") {
      this.authentificationService.SignOut();
    }
  };

  createSession() {
    this.authentificationService.modalSubShow.next('newsession');
  }


}
