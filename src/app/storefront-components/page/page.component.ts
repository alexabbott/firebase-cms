import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  pageContent: any;
  page: any;

  constructor(
    public db: AngularFireDatabase,
    public route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.pageContent = this.db.list('/pages', {
          query: {
            orderByChild: 'url',
            equalTo: params.url
          }
        });
        this.pageContent.subscribe(p => {
          if (p[0].published) {
            this.page = p[0];
            this.title.setTitle(this.page.title);
            this.meta.addTag({ name: 'description', content: 'View ' + this.page.title });
          } else {
            this.page = {
              title: 'Page Not Found',
              body: ''
            }
          }
        });
    });
  }
}
