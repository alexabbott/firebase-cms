import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  pages: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.pages = db.list('/pages', {
      query: {
        orderByChild: 'title'
      }
    })
  }
  ngOnInit() {
  }

}