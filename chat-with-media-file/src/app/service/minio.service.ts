import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVarService } from './global-var.service';
import { FileResponse } from '../models/fileResponse';

@Injectable({
  providedIn: 'root'
})
export class MinioService {
  private Url = "http://localhost:8081/api"
  constructor(private http: HttpClient, private global:GlobalVarService) { }

  uploadFile(file: File){
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<FileResponse>(`${this.Url}/files/upload?senderId=${this.global.loginUser.id}&recipientId=${this.global.selectedChat.recipientId}`, formData);
  }
}
