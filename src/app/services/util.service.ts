import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { User } from "app/models/user";

const apiUrl = "https://realestateapp-api.herokuapp.com/api/";

@Injectable({
  providedIn: "root",
})
export class UtilService {
  currentUser: User;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthService
  ) {}

  getRequest(uri) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    console.log(this.currentUser);

    let headers = new HttpHeaders({
      Authorization: "Token " + this.currentUser.token,
    });
    let options = {
      headers: headers,
    };
    return this.http.get(apiUrl + uri, options);
  }

  request(uri, data) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    console.log(this.currentUser);

    let headers = new HttpHeaders({
      Authorization: "Token " + this.currentUser.token,
    });
    let options = {
      headers: headers,
    };
    return this.http.post(apiUrl + uri, data, options);
  }
}
