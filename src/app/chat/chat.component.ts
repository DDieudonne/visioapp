import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification/authentification.service';
import * as io from 'socket.io-client';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private sub: Subscription;

  private ELEMENT_DATA: any[];
  private dataSource;
  private displayedColumns: string[] = ["image", 'name', "date", 'id'];

  private arrayIconsText = [
    { name: "Mes rooms", icon: "meeting_room", type: "rooms", check: true },
    { name: "Mes paramètres", icon: "build", type: "parameters", check: false }
  ];
  private selected: string = "rooms";
  private peerId;
  private socket: any;
  private loading: boolean = true;
  private user;

  private imagePath;
  private imgURL;

  constructor(private authentificationService: AuthentificationService) {
    this.socket = io("http://localhost:3000/");
  }

  ngOnInit() {
    this.authentificationService.getPeerInit().subscribe(peer => { this.peerId = peer.id });
    setTimeout(() => {  
      this.dataSource = this.authentificationService.getListMySession();
      console.log('dataSource', this.dataSource)
    }, 500);
    this.sub = this.authentificationService.getUserSub.subscribe(data => {
      this.user = data;
      console.log('user',this.user)
    });
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

  fileImportFunction(files) {
    console.log('files', files)
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.saveUser(this.imgURL);
    }
  }

  openWebcam(){
    this.authentificationService.modalSubShow.next("webcam");
  }

  saveUser(imgURL) {
    this.authentificationService.saveImgUser(this.user, imgURL).then((data) => {
      console.log('this.authentificationService.getMyUser()',this.authentificationService.getMyUser())
    });
  }

  ngOnDestroy() {
    this.sub != null ? this.sub.unsubscribe() : null;
    this.authentificationService.reset();
  }

}
