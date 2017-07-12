import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar } from '@angular/material';
import { GlobalService } from '../global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  posts: FirebaseListObservable<any>;
  newURL: string;
  newDate: string;
  newTitle: string;
  newBody: string;
  newPublished: boolean;
  currentUser: any;
  editMode: boolean;
  postKey: string;

  constructor(public db: AngularFireDatabase, public snackBar: MdSnackBar, public globalService: GlobalService, public route: ActivatedRoute) {
    this.newPublished = false;
    this.posts = db.list('/posts');
    this.globalService.user.subscribe(user => {
      this.currentUser = user;
    });
  }

  addPost(newURL: string, newDate: string, newTitle: string, newBody: string, newPublished: boolean) {
    let date = new Date(newDate);
    let dateTime = date.getTime();

    if (newURL && newDate && newTitle && newBody && this.currentUser.uid) {
      if (this.editMode && this.postKey) {
        this.db.object('/posts/' + this.postKey).update({
          url: newURL,
          dateAdded: Date.now(),
          date: dateTime,
          title: newTitle,
          body: newBody,
          published: newPublished,
          postedBy: this.currentUser.uid
        });
      } else {
          this.posts.push({
            url: newURL,
            dateAdded: Date.now(),
            date: dateTime,
            title: newTitle,
            body: newBody,
            published: newPublished,
            postedBy: this.currentUser.uid
          });

          this.newURL = null;
          this.newDate = null;
          this.newTitle = null;
          this.newBody = null;
          this.newPublished = false;
      }
      let snackBarRef = this.snackBar.open('Post saved', 'OK!', {
        duration: 3000
      });
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.key) {
          this.editMode = true;
          this.postKey = params.key;
          this.db.object('/posts/' + params.key).subscribe(p => {
            this.newURL = p.url;
            this.newDate = p.date;
            this.newTitle = p.title;
            this.newBody = p.body;
            this.newPublished = p.published;
          });
        }
    });
  }

}

