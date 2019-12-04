import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

import { Log } from "../log";
import { Song } from "../song";

@Component({
  selector: "app-log",
  templateUrl: "./log.component.html",
  styleUrls: ["./log.component.scss"]
})
export class LogComponent implements OnInit {
  songs: Object;
  songId: string;
  new_log = new Log("", "", "");
  all_logs:Object;
  log_types = ["request", "notice", "dispute"];
output_log_create="";


  constructor(private _http: HttpService, private _router: Router) {}

  ngOnInit() {
    this.get_all_songs();
    this.get_all_logs();
  }

  get_all_songs() {
    this._http.get_all_songs().subscribe(data => {
      if (data.msg) 
        this.songs = data.msg;
      else console.log("data error: " + data.error);
    });
  }

  get_all_logs() {
    this._http.get_all_logs().subscribe(data => {
      if (data.msg) 
        this.all_logs = data.msg;
      else console.log("data error: " + data.error);
    });
  }

  submit_log() {
    console.log(this.new_log);
    this._http.create_log(this.new_log).subscribe(data => {
      if (data.msg) {
        this.output_log_create = "success";
        this.get_all_logs();
      } else {
        this.output_log_create = ("fail add log" + data.error)
      }
    });
  }


}
