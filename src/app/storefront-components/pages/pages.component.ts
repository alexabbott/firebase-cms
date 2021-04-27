import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  pages: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.pages = db.list('/pages', ref => ref.orderByChild('title')).valueChanges();
  }

  ngOnInit() {
  }

}