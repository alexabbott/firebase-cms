import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { GlobalService } from '../global.service';
import { Router }    from '@angular/router';

@Component({
  selector: 'admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit {

  posts: FirebaseListObservable<any>;
  post: FirebaseObjectObservable<any>;

  constructor(public db: AngularFireDatabase, public globalService: GlobalService, public router: Router) {
    this.posts = db.list('/posts');
  }

  onChange(e: any, key: string) {
    this.post = this.db.object('/posts/' + key);
    if (e.checked) {
      this.post.update({published: true});
    } else {
      this.post.update({published: false});
    }
  }

  editPost(key: string) {
    console.log('edit');
    this.globalService.currentPost.next(key);
    this.router.navigateByUrl('admin/add-post');
  }

  ngOnInit() {
  }

}
