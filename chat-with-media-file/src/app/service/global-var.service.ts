import { Injectable } from '@angular/core';
import { MessageModel } from '../models/message';
import { User } from '../models/user';
import { Subject } from 'rxjs';
import { UserRequest } from '../models/userRequest';
import { ChatRoom } from '../models/chatRoom';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {
  private _messages: MessageModel[] = [];
  public selectedChat: ChatRoom =  new ChatRoom;
  public loginUser: UserRequest =  new UserRequest;
  public loginToken!: string;
  public chatRooms: ChatRoom[] = [];
  public messagesChange: Subject<void> =  new Subject<void>();
  public selectedUserChange: Subject<void> = new Subject<void>();
  public chatRoomChange: Subject<void> = new Subject<void>();

  constructor() { }

  get messages(): MessageModel[]{
    return this._messages;
  }

  set messages(value: MessageModel[]){
    this._messages = value;
    this.messagesChange.next();
  }

  get selectChat(): ChatRoom{
    return this.selectedChat;
  }

  set selectChat(value: ChatRoom){
    this.selectedChat = value;
    this.selectedUserChange.next();
  }

  get rooms(){
    return this.chatRooms;
  }

  set rooms(value: ChatRoom[]){
    this.chatRooms = value;
  }

  addMessage(message: MessageModel){
    this._messages.push(message);
    this.messagesChange.next();
  }

  addRoom(newRoom: any){
    this.chatRooms.push(newRoom);
    this.chatRoomChange.next();
  }

  getHeader(){
    let headers = new HttpHeaders;
    headers = headers.set('Authorization', `Bearer ${this.loginToken}`);
    return headers;
  }

}
