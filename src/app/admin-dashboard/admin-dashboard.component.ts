import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  posts: FirebaseListObservable<any>;
  pages: FirebaseListObservable<any>;
  users: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase) {
    this.posts = db.list('/posts');
    this.pages = db.list('/pages');
    this.users = db.list('/users');
  }

  ngOnInit() {
  }

}
