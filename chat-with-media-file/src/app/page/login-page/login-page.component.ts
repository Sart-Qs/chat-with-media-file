import { Component } from '@angular/core';
import { User } from '../../models/user';
import { LoginServiceService } from '../../service/login-service.service';
import { Router } from '@angular/router';
import { GlobalVarService } from '../../service/global-var.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WebSocketService } from '../../service/web-socket.service';
@Component({
  selector: 'app-login-page',
  standalone: false,
  
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  user: User =  new User;
  private jwtDecode: JwtHelperService = new JwtHelperService();
  constructor(private loginService : LoginServiceService, private router: Router, public global: GlobalVarService,private webSocketService: WebSocketService){};

  login(user : User){
    this.loginService.login(user).subscribe(r => {
      if(r){
        const decodedToken = this.jwtDecode.decodeToken<TokenModel>(JSON.stringify(r))
        if(decodedToken){
          this.global.loginToken = r;
          this.global.loginUser.id = decodedToken.id;
          this.router.navigate(["/messenger"]);
          this.webSocketService.connect();
        }
      }
    })
  }

}

interface TokenModel{
  sub: string;
  iat: number; 
  exp: number;
  id: number;
}
