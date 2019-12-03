import { Component, OnInit } from "@angular/core";
import { User } from "../user";
import { Router } from "@angular/router";
import { HttpService } from "../http.service";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  login_user_model = new User("", "h", "", "333", false, false, true);
  output: string;
  create_user_model = new User("", "h", "", "333", false, false, true);
  create_output = "";
  constructor(private _http: HttpService, private _router: Router) {}

  ngOnInit() {}

  login() {
    this._http.user_login(this.login_user_model).subscribe(
      data => {
        console.log("data");

        console.log(data);
        if (!data.msg) {
          localStorage.setItem("token", data.token);
          if (jwt_decode(data.token).isAdmin)
            this._router.navigate(["secure/admin"]);
          else this._router.navigate(["secure"]);

          console.log("Logged in");
        } else {
          this.output = data.msg;
          console.log(data.msg);
        }
      },
      error => {
        console.log(error);
        this.output = "username or password incorrect";
      }
    );
    console.log(this.login_user_model);
  }

  createUser() {
    console.log(this.create_user_model);
    this._http.add_new_user(this.create_user_model).subscribe(data => {
      console.log(data);
      if (
        this.create_user_model.name == "" ||
        this.create_user_model.email == "" ||
        this.create_user_model.password == ""
      )
        this.create_output = "required fields missing";
      else if (!data.msg) {
        localStorage.setItem("token", data.token);
        this._router.navigate(["secure"]);
      } else {
        this.create_output = "email already exits";
      }
    });
  }

  show_security_policy() {
    this._router.navigate(["security-privacy-policy"]);
  }

  show_DMCA_policy() {
    this._router.navigate(["dmca-takedown-policy"]);
  }

  keyword_search() {
    this._router.navigate(["keyword-search"]);
  }
}
