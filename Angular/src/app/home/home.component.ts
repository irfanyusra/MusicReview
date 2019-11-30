import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { User } from "../user";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  songs: Object;
  user_model = new User("email", "", "password", false, false, true);
  // output: string;
  constructor(private _http: HttpService) {}

  ngOnInit() {
    this._http.get_top_10_songs().subscribe(data => {
      this.songs = data;
      console.log(this.songs);
    });
  }

  login() {
    this._http.user_login(this.user_model).subscribe(data => {
      console.log(data);
      // this.output="";
    });
    console.log(this.user_model);
  }
}
