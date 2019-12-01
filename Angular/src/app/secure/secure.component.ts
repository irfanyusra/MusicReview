import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';


@Component({
  selector: "app-secure",
  templateUrl: "./secure.component.html",
  styleUrls: ["./secure.component.scss"]
})
export class SecureComponent implements OnInit {
  constructor(public _activatedRoute: ActivatedRoute, private _router: Router) {}

  ngOnInit() {
    console.log(history.state);
  }
}
