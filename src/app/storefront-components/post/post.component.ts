import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postContent: any;
  post: any;

  constructor(
    public db: AngularFireDatabase,
    public route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.postContent = this.db.list('/posts', ref => ref.orderByChild('url').equalTo(params.url));
        this.postContent.valueChanges().subscribe(p => {
          if (p[0].published) {
            this.post = p[0];
            this.title.setTitle(this.post.title);
            this.meta.updateTag({ content: 'View ' + this.post.title }, "name='description'");
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
