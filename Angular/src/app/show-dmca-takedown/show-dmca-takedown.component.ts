import { Component, OnInit } from '@angular/core';
import { DmcaTakedown } from "../dmca-takedown";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-show-dmca-takedown",
  templateUrl: "./show-dmca-takedown.component.html",
  styleUrls: ["./show-dmca-takedown.component.scss"]
})
export class ShowDmcaTakedownComponent implements OnInit {
  constructor(private _router: Router, private _http: HttpService) {}

  policy = new DmcaTakedown("", "", "");

  ngOnInit() {
    this.getPolicy();
  }

  getPolicy() {
    this._http.get_dmca_takedown_policiy().subscribe(data => {
      if (data.msg) {
        this.policy = data.msg;
        console.log(this.policy);
      } else console.log("getting policy error: " + data.error);
    });
  }
}
