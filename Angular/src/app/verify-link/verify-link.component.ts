import { Component, OnInit } from "@angular/core";
import { User } from "../user";
import { HttpService } from "../http.service";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: "app-verify-link",
  templateUrl: "./verify-link.component.html",
  styleUrls: ["./verify-link.component.scss"]
})
export class VerifyLinkComponent implements OnInit {
  constructor(private _router: Router, private _http: HttpService) {}
  current_user: User;
  link = "";
  ngOnInit() {
    console.log(history.state);
    this.current_user = jwt_decode(localStorage.getItem("token"));
    console.log(this.current_user);

    this._http.resend(this.current_user.email).subscribe(data => {
      if (data.msg) {
        this.link = data.msg;
      }
    });
  }
}
