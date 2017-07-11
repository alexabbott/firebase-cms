import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.css']
})
export class AdminPagesComponent implements OnInit {

  pages: FirebaseListObservable<any>;
  page: FirebaseObjectObservable<any>;
  domain: string;

  constructor(public db: AngularFireDatabase) {
    this.pages = db.list('/pages');
    this.domain = window.location.hostname;
  }

  onChange(e: any, key: string) {
    this.page = this.db.object('/pages/' + key);
    if (e.checked) {
      this.page.update({published: true});
    } else {
      this.page.update({published: false});
    }
  }

  ngOnInit() {
  }

}