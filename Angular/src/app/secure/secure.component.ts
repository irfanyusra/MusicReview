import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { HttpService } from "../http.service";
import * as jwt_decode from "jwt-decode";
import { SecureService } from "../secure.service";
import { User } from "../user";
import { Review } from "../review";
import { Song } from "../song";

@Component({
  selector: "app-secure",
  templateUrl: "./secure.component.html",
  styleUrls: ["./secure.component.scss"]
})
export class SecureComponent implements OnInit {
  songs: Object;
  reviews: Object;
  add_review_output = "";
  add_song_output = "";
add_song_rev =false; 
  new_review: Review = {
    subject: "",
    comment: "",
    songId: "",
    submittedBy: "",
    rating: 1
  };

  current_user: User;
  selected_song: Song;

  recent_review: Review = {
    subject: "",
    comment: "",
    songId: "",
    submittedBy: "",
    rating: 1
  };

  new_song: Song = {
    title: "",
    artist: "",
    album: "",
    year: 2019,
    genre: "",
    comment: "",
    hidden: false,
    copyRightViolation: false,
    noOfReviews: 0,
    avgRatings: 0
  };

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
    this.current_user = jwt_decode(localStorage.getItem("token"));
    console.log(this.current_user);
    console.log(this.new_song.comment);
  }
  most_recent_review(songId) {
    this._http.get_most_recent_review(songId).subscribe(data => {
      console.log(data.msg[0]);
      if (data.error || data.msg[0] == undefined)
        this.recent_review = {
          comment: "",
          subject: "",
          submittedBy: "",
          rating: 1,
          songId: ""
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
  onSelect(song) {
    this.selected_song = song;
  }
  submit_review() {
    console.log(this.current_user.email);
    this.new_review.submittedBy =  this.current_user.email;
    console.log(this.new_review);
    this._http.add_review(this.new_review).subscribe(data => {
      if (data.error) console.log(data.error);
      else {
          this._http.get_top_10_songs().subscribe(songs => {
          this.songs = songs;
        });
      }
      this.add_review_output = data.msg;
    });
  }

  add_new_song() {
    console.log(this.current_user.email);
    console.log(this.new_song.comment);

    this._http.add_song(this.new_song).subscribe(data => {
      if (data.error) console.log(data.error);
      else {
        this._http.get_top_10_songs().subscribe(songs => {
          this.songs = songs;
        });
      if (this.add_song_rev){
        this.new_review.submittedBy = this.current_user.email;
        this.new_review.songId = data.msg;
        console.log(this.new_review);
        this.submit_review();
        this.add_song_output = "Song added with Review:" +data.msg;

      }
      else this.add_song_output = "Song ID:" + data.msg;
      }

      
    });
  }
}
