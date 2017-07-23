import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar } from '@angular/material';
import { GlobalService } from '../global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

  pages: FirebaseListObservable<any>;
  page: FirebaseObjectObservable<any>;
  newURL: string;
  newTitle: string;
  newBody: string;
  newPublished: boolean;
  currentAdmin: any;
  editMode: boolean;
  pageKey: string;

  constructor(public db: AngularFireDatabase, public snackBar: MdSnackBar, public globalService: GlobalService, public router: Router, public route: ActivatedRoute) {
    this.newPublished = false;
    this.pages = db.list('/pages');
    this.globalService.admin.subscribe(admin => {
      this.currentAdmin = admin;
    });
  }

  addPage(newURL: string, newTitle: string, newBody: string, newPublished: boolean) {

    if (!newPublished) {
      newPublished = false;
    }

    if (newURL && newTitle && newBody && this.currentAdmin.uid) {
      if (this.editMode && this.pageKey) {
        this.db.object('/pages/' + this.pageKey).update({
          url: newURL,
          dateAdded: Date.now(),
          title: newTitle,
          body: newBody,
          published: newPublished,
          postedBy: this.currentAdmin.uid
        });
      } else {
        this.pages.push({
          url: newURL,
          dateAdded: Date.now(),
          title: newTitle,
          body: newBody,
          published: newPublished,
          postedBy: this.currentAdmin.uid
        });
      }

      let snackBarRef = this.snackBar.open('Page saved', 'OK!', {
        duration: 3000
      });

      setTimeout(() => {
        this.router.navigateByUrl('admin/pages');
      }, 3300);
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.key) {
          this.editMode = true;
          this.pageKey = params.key;
          this.db.object('/pages/' + params.key).subscribe(p => {
            this.newURL = p.url;
            this.newTitle = p.title;
            this.newBody = p.body;
            this.newPublished = p.published;
          });
        } else {
          this.newURL = null;
          this.newTitle = null;
          this.newBody = null;
          this.newPublished = false;
        }
    });
  }

}

