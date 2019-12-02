import { Component, OnInit } from '@angular/core';
import { SecPriv } from "../sec-priv";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-show-sec-priv",
  templateUrl: "./show-sec-priv.component.html",
  styleUrls: ["./show-sec-priv.component.scss"]
})
export class ShowSecPrivComponent implements OnInit {
  constructor(private _router: Router, private _http: HttpService) {}

  policy = new SecPriv("", "", "");

  ngOnInit() {
    this.getPolicy();
  }
  getPolicy() {
    this._http.get_security_privacy_policiy().subscribe(data => {
      if (data.msg) {
        this.policy = data.msg;
        // console.log(this.policy);
      } else console.log("getting policy error: " + data.error);
    });
  }
}
