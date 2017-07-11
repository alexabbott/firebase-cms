import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router }    from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { MdSnackBar } from '@angular/material';
import { GlobalService } from '../global.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  user: Observable<firebase.User>;
  posts: FirebaseListObservable<any>;
  post: FirebaseObjectObservable<any>;
  newLink: string;
  newDate: string;
  newTitle: string;
  newDescription: string;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth, public snackBar: MdSnackBar, public globalService: GlobalService, public router: Router) {
    this.posts = db.list('/posts');
    this.user = afAuth.authState;

    this.user.subscribe(currentUser => {
      if (!currentUser) {
        this.router.navigateByUrl('login');
      }
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  addPost(newLink: string, newDate: string, newTitle: string, newDescription: string) {
    let date = new Date(newDate);
    let dateTime = date.getTime();
    if (newLink && newDate && newTitle && newDescription) {
      this.posts.push({
        link: newLink,
        date: dateTime,
        title: newTitle,
        description: newDescription,
      });

      this.newLink = null;
      this.newDate = null;
      this.newTitle = null;
      this.newDescription = null;

      let snackBarRef = this.snackBar.open('Post saved', 'OK!', {
        duration: 3000
      });
    }
  }

  onChange(e: any, key: string) {
      this.post = this.db.object('/posts/' + key);
      if (e.checked) {
        this.post.update({published: true});
      } else {
        this.post.update({published: false});
      }
  }

  ngOnInit() {
  }

}
