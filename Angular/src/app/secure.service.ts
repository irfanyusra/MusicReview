import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";


@Injectable({
  providedIn: "root"
})
export class SecureService {
  constructor() {}
//TODO: fix the error with the token 
  loggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
