import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { catchError, tap, throwError } from 'rxjs';
import { ChatRoom } from '../models/chatRoom';
import { GlobalVarService } from './global-var.service';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private baseUrl = "/api";

  constructor(private http : HttpClient, private global: GlobalVarService) { };

  login(user : User){
    return this.http.post<any>(`${this.baseUrl}/login`, user)
  }

  logout(user : User){
    return this.http.post<any>(`${this.baseUrl}/logout`, user);
  }

}
