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
  getRev = false;
  recent_review: Object = {
    comment: "",
    subject: "",
    submittedBy: "",
    rating: "",
    submittedOn: ""
  };
  reviews: Object;
  constructor(private _http: HttpService, private _router: Router) {}

  ngOnInit() {
    this._http.get_top_10_songs().subscribe(data => {
      this.songs = data;
      console.log(this.songs);
    });
  }

  most_recent_review(songId) {
    // console.log("hrtr");
    this._http.get_most_recent_review(songId).subscribe(data => {
      //  this.songs = data;
      // this.getRev = false;
      console.log(data.msg[0]);
      if (data.error || data.msg[0] == undefined)
        this.recent_review = {
          comment: "",
          subject: "",
          submittedBy: "",
          rating: "",
          submittedOn: ""
        };
      else this.recent_review = data.msg[0];
    });
  }
  all_reviews(songId) {
    console.log("hrtr");
    this._http.get_all_reviews(songId).subscribe(data => {
      //  this.songs = data;
      // this.getRev = false;
      // console.log(data.msg[0].comment);
      console.log(data.msg[0]);
      // console.log(data.msg[0].comment);
      if (data.error) this.reviews = [];
      else this.reviews=data.msg;
    });
  }
}
