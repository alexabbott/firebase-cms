import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { GlobalService } from '../../services/global.service';
import { Router }    from '@angular/router';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'

@Component({
  selector: 'admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss']
})
export class AdminPostsComponent implements OnInit {

  posts: FirebaseListObservable<any>;
  post: FirebaseObjectObservable<any>;
  selectedOption: any;
  dialogRef: MdDialogRef<any>;
  storageRef: any;
  currentAdmin: any;

  constructor(
    public af: FirebaseApp,
    public db: AngularFireDatabase,
    public globalService: GlobalService,
    public router: Router,
    public dialog: MdDialog,
    public snackBar: MdSnackBar
  ) {
    this.posts = db.list('/posts');

    this.storageRef = af.storage().ref();

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }

  onChange(e: any, key: string) {
    this.post = this.db.object('/posts/' + key);
    if (e.checked) {
      this.post.update({published: true});
    } else {
      this.post.update({published: false});
    }
  }

  deletePost(post: any) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/posts/' + post.$key).remove();

        if (post.thumbnail) {
          let storage = firebase.storage();
          let imageRef = storage.refFromURL(post.thumbnail);
          let me = this;
          imageRef.delete().then(function() {
            let snackBarRef = me.snackBar.open('Post deleted', 'OK!', {
              duration: 3000
            });
          }).catch(function(error) {
            console.log('error', error);
          });
        } else {
          let snackBarRef = this.snackBar.open('Post deleted', 'OK!', {
            duration: 3000
          });
        }
      }
    });
  }

  ngOnInit() {
  }

}