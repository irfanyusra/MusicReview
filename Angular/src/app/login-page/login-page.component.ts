import { Component, OnInit } from '@angular/core';
import { User } from "../user";
import { Router } from "@angular/router";
import { HttpService } from "../http.service";


@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  user_model = new User("h", "", "333", false, false, true);
  output: string;

  constructor(private _http: HttpService, private _router: Router) {}

  ngOnInit() {}

  login() {
    this._http.user_login(this.user_model).subscribe(
      data => {
        // console.log(data);
        this.output = "Logged in";
        if (!data.message) {
          localStorage.setItem("token", data.token);
          this._router.navigate(["secure"]);
        } else {
          console.log(data.message);
        }
      },
      error => {
        console.log(error);
        this.output = "Error logging in";
      }
    );
    console.log(this.user_model);
  }
}
