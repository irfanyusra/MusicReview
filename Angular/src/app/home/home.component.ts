import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  refresh_top10 = true;
  constructor(private _http: HttpService, private _router: Router) {}

  ngOnInit() {
    localStorage.clear();
  }
}
