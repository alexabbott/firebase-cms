import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.posts = db.list('/posts', {
      query: {
        orderByChild: 'published',
        equalTo: true
      }
    })
  }

  ngOnInit() {
  }

}
