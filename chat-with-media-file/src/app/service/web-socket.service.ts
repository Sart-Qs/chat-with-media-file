import { Injectable } from '@angular/core';
import Stomp, { Client } from 'stompjs';
import SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageModel } from '../models/message';
import { GlobalVarService } from './global-var.service';
import { UserRequest } from '../models/userRequest';
import { ChatRoom } from '../models/chatRoom';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  //TODO create interface for response 
  private stompClient!: Client;
  private serverUrl = 'http://localhost:8081/ws';
  private Url = 'http://localhost:4200/api';
 
  constructor(private http : HttpClient, private global: GlobalVarService) {}
  connect(): void {
    const sock = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(sock);
    this.stompClient.connect({}, this.onConnected, this.onError);
  }

  onConnected = () => {
    console.log("connected");
    this.stompClient.subscribe(
      "/user/" + this.global.loginUser.id + "/queue/messages",
      (msg: any) => {
        const message = JSON.parse(msg.body);
        this.global.addMessage(message);
      }
    );
  };

  onError = (err: any) => {
    console.log(err);
  };


  sendMessage(msg: MessageModel){
    this.stompClient.send("/app/chat", {}, JSON.stringify(msg));
  }

  

  getAllMessages(): Observable<MessageModel[]>{
    return this.http.get<MessageModel[]>(`${this.Url}/chat/messages/${this.global.loginUser.id}/${this.global.selectedChat.recipientId}`);
  }


  findUser(fullName: string): Observable<UserRequest>{
    return this.http.get<UserRequest>(`${this.Url}/users/${fullName}`);
  }
  
  //TODO change interface
  getAllChat(): Observable<any>{  
    console.log('Login Token:', this.global.loginToken);
    return this.http.get<any>(`${this.Url}/chat/rooms?senderId=${this.global.loginUser.id}`);
  }


}
