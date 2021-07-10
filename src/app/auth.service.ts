import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class AuthService {


    constructor(private http: HttpClient) {
    }



    tokenPartition: any;
    tokenBody: any;


    // private loggedIn = new BehaviorSubject<boolean>(false); // {1}
    // // private loginUser = new BehaviorSubject<string>("no login"); // {1}


    // get isLoggedIn() {
    //     return this.loggedIn.asObservable(); // {2}
    // }

    public UserName = new BehaviorSubject<string>("From Service");

    get isLoggedInUser() {
        console.log(" form service:::" +this.UserName.value)
        return this.UserName.value;
    }

    public updateUser(user:string){
        this.UserName.next(user)
        console.log("Updated form service:::" +this.UserName.value)

    }
    


    checkTokenValidity() {
        var token = localStorage.getItem('access_token');

        if (token === null || token === undefined) {
            return false;
        }

        this.tokenPartition = token.split('.');

        if (this.tokenPartition.length === 3) {
            var tokenBase64Body = this.tokenPartition[1];
            this.tokenBody = JSON.parse(atob(tokenBase64Body));

            if (this.tokenBody.exp !== null || this.tokenBody.exp !== '') {
                var currentDateTime = new Date().getTime() / 1000;

                if (this.tokenBody.exp < currentDateTime) {
                    return false;
                }
            }
        }
        else {
            return false;
        }

        return true;
    }



    getUser() {
        this.checkTokenValidity();
        // localStorage.setItem('username', this.tokenBody.nameid);
        return (this.tokenBody.nameid);

    }






}