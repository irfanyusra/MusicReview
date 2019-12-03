import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";
import { Review } from "../review";

@Component({
  selector: "app-keyword-search",
  templateUrl: "./keyword-search.component.html",
  styleUrls: ["./keyword-search.component.scss"]
})
export class KeywordSearchComponent implements OnInit {
  constructor(private _http: HttpService, private _router: Router) {}

  keyword = "";
  songs: Object;

  recent_review: Review = {
    subject: "",
    comment: "",
    songId: "",
    submittedBy: "",
    rating: 1
  };

  reviews: Object;

  ngOnInit() {}

  most_recent_review(songId) {
    this._http.get_most_recent_review(songId).subscribe(data => {
      console.log(data.msg[0]);
      if (data.error || data.msg[0] == undefined)
        this.recent_review = {
          comment: "",
          subject: "",
          submittedBy: "",
          songId: "",
          rating: 1
        };
      else this.recent_review = data.msg[0];
    });
  }

  all_reviews(songId) {
    this._http.get_all_reviews(songId).subscribe(data => {
      console.log(data.msg[0]);
      if (data.error) this.reviews = [];
      else this.reviews = data.msg;
    });
  }

  search() {
    console.log('this.keyword:', this.keyword)
    this._http.keyword_search(this.keyword).subscribe(data => {
      this.songs = data.msg;
      console.log("this.songs", this.songs);
    });
  }

  keyword_search() {
    this._router.navigate(["keyword-search"]);
  }
  show_security_policy() {
    this._router.navigate(["security-privacy-policy"]);
  }

  show_DMCA_policy() {
    this._router.navigate(["dmca-takedown-policy"]);
  }
}
