import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router }    from '@angular/router';

@Component({
  selector: 'admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.css']
})
export class AdminPagesComponent implements OnInit {

  pages: FirebaseListObservable<any>;
  page: FirebaseObjectObservable<any>;
  domain: string;

  constructor(public db: AngularFireDatabase, public router: Router) {
    this.pages = db.list('/pages');
    this.domain = window.location.hostname;
  }

  onChange(e: any, key: string) {
    this.page = this.db.object('/pages/' + key);
    if (e.checked) {
      this.page.update({published: true});
    } else {
      this.page.update({published: false});
    }
  }

  editPage(key: string) {
    this.router.navigateByUrl('admin/edit-page/' + key);
  }

  deletePage(key: string) {
    this.db.object('/pages/' + key).remove();
  }

  ngOnInit() {
  }

}