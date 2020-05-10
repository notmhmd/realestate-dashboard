import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { User } from "app/models/user";
import { ToastrService } from "ngx-toastr";

const apiUrl = "https://realestateapp-api.herokuapp.com/api/";

@Injectable({
  providedIn: "root",
})
export class UtilService {
  currentUser: User;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthService,
    private toastr: ToastrService
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
  //from : the positon of the notifecation
  //align: aligment of the Notifecation
  //type: type of the massage 1 for info , 2 success and so on ..
  showNotification(from, align, type, text, title) {
    switch (type) {
      case 1:
        this.toastr.info(text, title, {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-info alert-with-icon",
          positionClass: "toast-" + from + "-" + align,
        });
        break;
      case 2:
        this.toastr.success(text, title, {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: "toast-" + from + "-" + align,
        });
        break;
      case 3:
        this.toastr.warning(text, title, {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: "toast-" + from + "-" + align,
        });
        break;
      case 4:
        this.toastr.error(text, title, {
          timeOut: 4000,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: "toast-" + from + "-" + align,
        });
        break;
      case 5:
        this.toastr.show(text, title, {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-" + from + "-" + align,
        });
        break;
      default:
        break;
    }
  }
}
