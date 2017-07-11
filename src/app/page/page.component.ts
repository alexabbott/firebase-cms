import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  pageContent: any;
  page: any;

  constructor(public db: AngularFireDatabase, public route: ActivatedRoute) {}

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
