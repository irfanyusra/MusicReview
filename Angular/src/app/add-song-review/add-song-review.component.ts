import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { Review } from "../review";
import { Song } from "../song";
import { Router } from "@angular/router";
import { User } from "../user";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: "app-add-song-review",
  templateUrl: "./add-song-review.component.html",
  styleUrls: ["./add-song-review.component.scss"]
})
export class AddSongReviewComponent implements OnInit {
  current_user: User;
  selected_song: Song;
  refresh_top10 = true;
  add_review_output = "";
  add_song_output = "";
  add_song_rev = false;
  songs: Object;

  new_review: Review = {
    subject: "",
    comment: "",
    songId: "",
    submittedBy: "",
    rating: 1
  };

  new_song: Song = {
    title: "",
    track: null,
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

  constructor(private _router: Router, private _http: HttpService) {}

  ngOnInit() {
    console.log(history.state);
    this.current_user = jwt_decode(localStorage.getItem("token"));
    console.log(this.current_user);
    console.log(this.new_song.comment);
    this.get_all_avail_songs();
  }

  onSelect(song) {
    this.selected_song = song;
  }

  submit_review() {
    console.log(this.current_user.email);
    this.new_review.submittedBy = this.current_user.email;
    console.log(this.new_review);
    this._http.add_review(this.new_review).subscribe(data => {
      if (data.error) console.log(data.error);
      else this.refresh_top10 = !this.refresh_top10;
      this.add_review_output = data.msg;
    });
  }

  get_all_avail_songs() {
    this._http.get_all_avail_songs().subscribe(data => {
      this.songs = data.msg;
      console.log(this.songs);
    });
  }
  add_new_song() {
    console.log(this.current_user.email);
    console.log(this.new_song.comment);

    this._http.add_song(this.new_song).subscribe(data => {
      if (data.error) console.log(data.error);
      else {
        this.get_all_avail_songs();
        if (this.add_song_rev) {
          this.new_review.submittedBy = this.current_user.email;
          this.new_review.songId = data.msg;
          console.log(this.new_review);
          this.submit_review();
          // TODO: fi the validate problem
          this.add_song_output = "Song added with Review:" + data.msg;
        } else this.add_song_output = "Song ID:" + data.msg;
      }
    });
  }
  
}
