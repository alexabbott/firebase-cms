import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: FirebaseListObservable<any[]>;
  searchTerm: string;

  constructor(
    public db: AngularFireDatabase,
    public globalService: GlobalService,
    public router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.posts = db.list('/posts', {
      query: {
        orderByChild: 'published',
        equalTo: true,
        limitToLast: 20,
      }
    });

    this.globalService.searchTerm.subscribe((term) => {
      this.searchTerm = term;
    });
  }

  ngOnInit() {
    this.title.setTitle('Blog');
    this.meta.updateTag({ content: 'View recent blog posts' }, "name='description'");

    if (this.router.url.includes('blog')) {
      this.globalService.searchTerm.next('');
    }
  }

  getPostImage(post:any) {
    if (post.thumbnail) {
      return post.thumbnail;
    } else {
      return '../../assets/placeholder.jpg';
    }
  }
}
