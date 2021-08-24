import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { GlobalService } from '@services/global.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Observable<any[]>;
  searchTerm: string;

  constructor(
    public db: AngularFireDatabase,
    public globalService: GlobalService,
    public router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.posts = db.list('/posts', ref => ref.orderByChild('published').equalTo(true).limitToLast(20)).valueChanges();

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
