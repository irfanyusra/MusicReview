import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { User } from "../user";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  songs: Object;
  user_model = new User("h", "", "333", false, false, true);
  output: string;
  constructor(private _http: HttpService, private _router: Router) {}

  ngOnInit() {
    this._http.get_top_10_songs().subscribe(data => {
      this.songs = data;
      console.log(this.songs);
    });
  }

  login() {
    this._http.user_login(this.user_model).subscribe(
      data => {
        // console.log(data);
        this.output = "Logged in";
        if (!data.message) {
          localStorage.setItem("jwtToken", data.token);
          this._router.navigate(['secure']);
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
