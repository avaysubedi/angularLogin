import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userFromLogin: any;

  constructor(public auth:AuthService) { 

  }
  ngOnInit() {
    this.userFromLogin=this.auth.isLoggedInUser;
  }

}
