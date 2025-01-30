import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageModel } from '../../models/message';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../service/web-socket.service';
import { GlobalVarService } from '../../service/global-var.service';
import { MinioService } from '../../service/minio.service';
import { LoginServiceService } from '../../service/login-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-open-chat-component',
  standalone: false,

  templateUrl: './open-chat-component.component.html',
  styleUrl: './open-chat-component.component.css',
})
export class OpenChatComponentComponent implements OnInit, OnDestroy{
  messages: MessageModel[] = [];
  newMessage: string = '';
  selectedFile: File | null = null;
  messagesSubscription!: Subscription;
  chatSubscription!: Subscription;
  isContent: boolean = true;
  isChatSelect: boolean = false;


  constructor(private webSocketService: WebSocketService, public global: GlobalVarService, private miniIo: MinioService, private loginService: LoginServiceService, private router: Router) {}

  ngOnInit(): void {
    this.messagesSubscription = this.global.messagesChange.subscribe(() => {
      this.messages = this.global.messages;
    });

    this.chatSubscription = this.global.selectedUserChange.subscribe(() => {
      this.getMessages();
    })
  }

  sendMessage(){
    const message: MessageModel = new MessageModel();
    message.senderId = this.global.loginUser.id;
    message.recipientId = Number(this.global.selectedChat.recipientId);
    message.content = this.newMessage;
    message.timestamp = new Date();
    if (this.newMessage !== "") {
      this.webSocketService.sendMessage(message);
      this.newMessage = '';
      this.global.addMessage(message)
    }
    this.newMessage = '';
  }

  getMessages() {
    this.webSocketService.getAllMessages().subscribe((data: MessageModel[]) => {
      this.global.messages = data;
      this.isChatSelect = true;
    });
  }

  sendFile(event: Event){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      if (this.selectedFile) {
        this.miniIo.uploadFile(this.selectedFile).subscribe((response) => {
          const message: MessageModel = new MessageModel();
          message.senderId = this.global.loginUser.id;
          message.recipientId = Number(this.global.selectedChat.recipientId);
          message.content = response.fileUrl;
          message.fileType = response.fileType;
          message.timestamp = new Date();

          this.webSocketService.sendMessage(message);
          this.global.addMessage(message);
        });
      }
    }
  }

  isImageFile(fileType: string): boolean{
    if(fileType){
      return fileType.startsWith('image/');
    }
    return false;
  }

  isVideoFile(fileType: string): boolean{
    if(fileType){
      return fileType.startsWith('video/');
    }
    return false;
  }

  isOtherFile(fileType: string): boolean{
    if(fileType){
      return !this.isImageFile(fileType) && !this.isVideoFile(fileType) && !this.isText(fileType)
    }
    return false;
  }

  isText(fileType: string): boolean{
    if(!fileType){
      return true;
    }
    return false;
  }

  isSender(message: MessageModel): boolean{
    if(message.senderId == this.global.loginUser.id){
      return true;
    }
    else{
      return false;
    }
  }

  exitChat(){
    this.loginService.logout(this.global.loginUser).subscribe(r => {
      this.router.navigate(["/"]);
    });
  }

  ngOnDestroy(): void {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
  }
}

