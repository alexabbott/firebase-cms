import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { FirebaseApp } from '@angular/fire';
import { GlobalService } from '../../../services/global.service';
import { Router }    from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss']
})
export class AdminPostsComponent implements OnInit {

  posts: Observable<any>;
  post: AngularFireObject<any>;
  selectedOption: any;
    dialogRef: MatDialogRef<any>;
  storageRef: any;
  currentAdmin: any;

  constructor(
    public af: FirebaseApp,
    public db: AngularFireDatabase,
    public globalService: GlobalService,
    public router: Router,
      public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.posts = db.list('/posts').snapshotChanges();

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
        this.db.object('/posts/' + post.key).remove();

        // if (post.thumbnail) {
        //   let storage = firebase.storage();
        //   let imageRef = storage.refFromURL(post.thumbnail);
        //   let me = this;
        //   imageRef.delete().then(function() {
        //     let snackBarRef = me.snackBar.open('Post deleted', 'OK!', {
        //       duration: 3000
        //     });
        //   }).catch(function(error) {
        //     console.log('error', error);
        //   });
        // } else {
          let snackBarRef = this.snackBar.open('Post deleted', 'OK!', {
            duration: 3000
          });
        // }
      }
    });
  }

  ngOnInit() {
  }

}
