import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postContent: any;
  post: any;

  constructor(public db: AngularFireDatabase, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.postContent = this.db.list('/posts', {
          query: {
            orderByChild: 'url',
            equalTo: params.url
          }
        });
        this.postContent.subscribe(p => {
          if (p[0].published) {
            this.post = p[0];
          } else {
            this.post = {
              title: 'Post Not Found',
              body: ''
            }
          }
        });
    });
  }
}
