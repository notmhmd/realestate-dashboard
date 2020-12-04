import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { User } from "app/models/user";
import { ToastrService } from "ngx-toastr";
export enum NotifecationType {
  info,
  error,
  success,
  warning,
  default,
}

const apiUrl = "http://127.0.0.1:8000/api/";

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
  showNotification(from, align, type: NotifecationType, text, title) {
    console.log(type, "Not Type");

    if (NotifecationType.info == type) {
      this.toastr.info(text, title, {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-info alert-with-icon",
        positionClass: "toast-" + from + "-" + align,
      });
    } else if (NotifecationType.success == type) {
      this.toastr.success(text, title, {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-" + from + "-" + align,
      });
    } else if (NotifecationType.warning == type) {
      this.toastr.warning(text, title, {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-warning alert-with-icon",
        positionClass: "toast-" + from + "-" + align,
      });
    } else if (NotifecationType.error == type) {
      this.toastr.error(text, title, {
        timeOut: 4000,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-" + from + "-" + align,
      });
    } else if (NotifecationType.default == type) {
      this.toastr.show(text, title, {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-primary alert-with-icon",
        positionClass: "toast-" + from + "-" + align,
      });
    }
  }
}
