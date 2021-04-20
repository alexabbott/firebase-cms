import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { AngularFireDatabase } from '@angular/fire/database';

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
        this.pageContent = this.db.list('/pages', ref => ref.orderByChild('url').equalTo(params.url));
        this.pageContent.valueChanges().subscribe(p => {
          if (p[0].published) {
            this.page = p[0];
            this.title.setTitle(this.page.title);
            this.meta.updateTag({ content: 'View ' + this.page.title }, "name='description'");
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
