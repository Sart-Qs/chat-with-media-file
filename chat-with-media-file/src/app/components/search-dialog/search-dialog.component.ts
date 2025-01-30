import { Component, OnInit } from '@angular/core';
import { UserRequest } from '../../models/userRequest';
import { WebSocketService } from '../../service/web-socket.service';
import { GlobalVarService } from '../../service/global-var.service';

@Component({
  selector: 'app-search-dialog',
  standalone: false,
  
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.css'
})
export class SearchDialogComponent{
  name: string = "";
  users: UserRequest = new UserRequest;

  constructor(private webSocketService: WebSocketService, private global: GlobalVarService){
    this.users.userName = "";
  }

  search(name: string){
    this.webSocketService.findUser(name).subscribe(r => {
      if(r !== null){
        this.users = r;
      }
    })
  }

  addNewChat(user: UserRequest){
    const newRoom = {
      senderId: this.global.loginUser.id,
      senderFullName: this.global.loginUser.fullName,
      recipientId: user.id,
      recipientFullName: user.fullName
    }
    this.global.addRoom(newRoom);
  } 
}
