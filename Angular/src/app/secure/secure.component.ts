import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
  selector: "app-secure",
  templateUrl: "./secure.component.html",
  styleUrls: ["./secure.component.scss"]
})
export class SecureComponent implements OnInit {
  songs: Object;
  recent_review: Object = {
    comment: "",
    subject: "",
    submittedBy: "",
    rating: "",
    submittedOn: ""
  };
  reviews: Object;

  constructor(
    public _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _http: HttpService
  ) {}

  ngOnInit() {
    console.log(history.state);
    this._http.get_top_10_songs().subscribe(data => {
      this.songs = data;
      console.log(this.songs);
    });
  }
  most_recent_review(songId) {
    this._http.get_most_recent_review(songId).subscribe(data => {
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
    this._http.get_all_reviews(songId).subscribe(data => {
      if (data.error) this.reviews = [];
      else this.reviews = data.msg;
    });
  }
}
