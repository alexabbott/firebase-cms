import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { GlobalService } from '../global.service';
import { Router }    from '@angular/router';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'

@Component({
  selector: 'admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit {

  posts: FirebaseListObservable<any>;
  post: FirebaseObjectObservable<any>;
  selectedOption: any;
  dialogRef: MdDialogRef<any>;

  constructor(public db: AngularFireDatabase, public globalService: GlobalService, public router: Router, public dialog: MdDialog, public snackBar: MdSnackBar) {
    this.posts = db.list('/posts');
  }

  onChange(e: any, key: string) {
    this.post = this.db.object('/posts/' + key);
    if (e.checked) {
      this.post.update({published: true});
    } else {
      this.post.update({published: false});
    }
  }

  editPost(key: string) {
    this.router.navigateByUrl('admin/edit-post/' + key);
  }

  deletePost(key: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/posts/' + key).remove();
  
        let snackBarRef = this.snackBar.open('Post deleted', 'OK!', {
          duration: 3000
        });
      }
    });
  }

  ngOnInit() {
  }

}