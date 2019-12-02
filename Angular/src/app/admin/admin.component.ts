import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { Router } from "@angular/router";
import { Song } from "../song";
import { User } from "../user";
import { Review } from "../review";



@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  users: Object;
  songs: Object;
  selectedSong: Song;

  selected_user: User = {
    id: "",
    email: "",
    name: "",
    password: "",
    isAdmin: false,
    verified: false,
    isActive: true
  };

  constructor(private _http: HttpService, private _router: Router) {}

  ngOnInit() {
    this.get_all_users();
    this.get_all_songs();
  }

  get_all_songs() {
    this._http.get_all_songs().subscribe(data => {
      this.songs = data.msg;
      console.log(this.songs);
    });
  }

  onSelect(song: Song) {
    this.selectedSong = song;
  }

  get_all_users() {
    this._http.get_all_users().subscribe(data => {
      this.users = data.msg;
      console.log(this.users);
    });
  }

  // submitAdmin() {
  //   console.log("User to make admin: " + this.userModel);
  //   this.authService.putUserAdmin(this.userModel.id).subscribe(
  //     data => {
  //       console.log("data " + data);
  //     },
  //     error => {
  //       console.log("error " + error);
  //     }
  //   );
  // }
}
