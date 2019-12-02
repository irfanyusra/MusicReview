import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";
import { Song } from "../song";
import { User } from "../user";
import { Review } from "../review";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  users: Object;
  songs: Object;
  // selected_song: Song;
  current_user: User;
  refresh_top10 = true;

  // selected_user: User = {
  //   id: "",
  //   email: "",
  //   name: "",
  //   password: "",
  //   isAdmin: false,
  //   verified: false,
  //   isActive: true
  // };

  toggle_admin_output = "";
  toggle_active_output = "";
  toggle_hidden_output = "";

  selected_user_id: "";
  selected_song_id: "";

  constructor(private _http: HttpService, private _router: Router) {}

  ngOnInit() {
    this.get_all_users();
    this.get_all_songs();
    this.current_user = jwt_decode(localStorage.getItem("token"));
  }

  get_all_songs() {
    this._http.get_all_songs().subscribe(data => {
      this.songs = data.msg;
    });
  }

  // onSelect(song: Song) {
  //   this.selected_song = song;
  // }

  get_all_users() {
    this._http.get_all_users().subscribe(data => {
      this.users = data.msg;
      console.log("this.users");

      console.log(this.users);
    });
  }

  toggle_admin() {
    console.log(this.selected_user_id);
    this._http.toggle_admin(this.selected_user_id).subscribe(data => {
      if (data.error) this.toggle_admin_output = data.error;
      else {
        console.log("data " + data.msg);
        this.toggle_admin_output = data.msg;
        this.get_all_users();
      }
    });
  }

  toggle_hide() {
    console.log(this.selected_song_id);
    this._http.toggle_hide(this.selected_song_id).subscribe(data => {
      if (data.error) this.toggle_hidden_output = data.error;
      else {
        console.log("data " + data.msg);
        this.toggle_hidden_output = data.msg;
        this.get_all_songs();
        this.refresh_top10 = !this.refresh_top10;
      }
    });
  }



  
}
