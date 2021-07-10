import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // isLoggedIn$: Observable<boolean>;
  user: any;
  // UserName:  Observable<string>;
  constructor(private http:HttpClient,private auth:AuthService){
    // this.isLoggedIn$ = this.auth.isLoggedIn; // {2}
  //  this.user = this.auth.isLoggedInUser;
    // console.log(this.UserName)


  }



  ngOnInit() {
    this.user=this.auth.isLoggedInUser;

  }


  title = 'loginApp';

  username: string = 'ohmar';
  password: string = '12345';
  baseUrl : string= 'http://192.168.50.126/medipro.api.medipro/';
  tokenPartition : any ;
  tokenBody:any;

check(login:string){
  this.auth.updateUser(login);
 this.user=this.auth.isLoggedInUser;
}
  
  tryLogin() {
    this.http.post(this.baseUrl + 'token', "userName=" + encodeURIComponent(this.username) +
        "&password=" + encodeURIComponent(this.password) +
        "&grant_type=password",
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).subscribe(res => this
        .Success(res),
        res => this.Error(res));
}

Error(res: any) {
  console.debug(res);
}
Success(res: any) {
  localStorage.setItem('access_token', res.access_token);
  localStorage.setItem('expiresIn', res.expires_in);
  console.log(res);
  this.check("from login")
  //this.newusername = this.auth.isLoggedInUser;
  //this.newusername = this.auth.getUser();

}



}
