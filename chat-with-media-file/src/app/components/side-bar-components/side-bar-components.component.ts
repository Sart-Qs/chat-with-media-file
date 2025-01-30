import { Component, OnInit } from '@angular/core';
import { ChatRoom } from '../../models/chatRoom';
import { LoginServiceService } from '../../service/login-service.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { WebSocketService } from '../../service/web-socket.service';
import { GlobalVarService } from '../../service/global-var.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-bar-components',
  standalone: false,
  
  templateUrl: './side-bar-components.component.html',
  styleUrl: './side-bar-components.component.css'
})
export class SideBarComponentsComponent{
  chatRoom = new ChatRoom();

  constructor(public global: GlobalVarService, public dialog: MatDialog, private webSocketService: WebSocketService) {
    this.webSocketService.getAllChat().subscribe(r => {
      this.global.rooms = r;
    })
  };

  getGradient(name: string): string {
    const colors = [
        'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
        'linear-gradient(45deg, #f09 0%, #fad0c4 99%, #fad0c4 100%)',
        'linear-gradient(45deg, #a1c4fd 0%, #c2e9fb 100%)',
        'linear-gradient(45deg, #ffecd2 0%, #fcb69f 100%)',
        'linear-gradient(45deg, #a18cd1 0%, #fbc2eb 100%)'
    ];
    const charCode = name.charCodeAt(0) % colors.length;
    return colors[charCode];
}

  addNewChat(){
    const searchUserDialog = this.dialog.open(SearchDialogComponent, {
      width: '400px',
      height: '700px',
      data: 'null'
    })
  }

  selectChat(room: ChatRoom){
    this.global.selectChat = room;
    this.global.selectedUserChange.next();
  }
}
