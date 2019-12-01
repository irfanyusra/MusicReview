import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class SecureService {
  constructor() {}

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  checkAdmin() {
    return jwt_decode(localStorage.getItem("token")).isAdmin;
  }
}
