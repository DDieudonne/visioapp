import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification/authentification.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private arrayIconsText = [
    { name: "Mes rooms", icon: "meeting_room", type: "rooms" },
    { name: "Mon planning", icon: "event", type: "events" },
    { name: "Mes paramètres", icon: "build", type: "parameters" },
    { name: "Déconnexion", icon: "directions_run", type: "logout", out: true }
  ];
  private selected: string = "rooms";

  constructor(private authentificationService: AuthentificationService) { }

  ngOnInit() { }

  selectCard(type) {
    this.selected = type;
    console.log('type', type)
    if (type == "logout") {
      this.authentificationService.SignOut();
    }
  };

}
