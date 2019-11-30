import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  songs: Object;

  constructor(private _http: HttpService) {}

  ngOnInit() {
    this._http.get_top_10_songs().subscribe(data => {
      this.songs = data;
      console.log(this.songs);
    });
  }
}
