import { Component, OnInit, Inject, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { GlobalService } from 'app/services/global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  posts: AngularFireList<any>;
  newURL: string;
  newDate: string;
  newTitle: string;
  newThumbnail: string;
  newBody: string;
  newPublished: boolean;
  currentAdmin: any;
  editMode: boolean;
  postKey: string;
  storageRef: any;
  file: any;
  imageUrl: any;
  currentPost: AngularFireObject<any>;
  currentModeratedPosts: AngularFireList<any>;
  entityObject: any;
  dialogRef: MdDialogRef<any>;
  selectedOption: string;
  awaitingApproval: string;

  constructor(
    public af: FirebaseApp,
    public db: AngularFireDatabase,
    public snackBar: MdSnackBar,
    public globalService: GlobalService,
    public router: Router,
    public route: ActivatedRoute,
    private fb: FirebaseApp,
    public dialog: MdDialog
  ) {

    this.newPublished = false;
    this.posts = db.list('/posts');

    this.globalService.admin.subscribe(admin => {
      this.currentAdmin = admin;
    });

    this.storageRef = af.storage().ref();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params && params.key) {
        this.editMode = true;
        this.postKey = params.key;

        if (this.router.url.includes('approval')) {
          this.currentPost = this.db.object('/approvals/posts/' + params.key);
          this.db.object('/approvals/posts/' + this.postKey).valueChanges().subscribe((approvalPost:any) => {
            this.entityObject = approvalPost;
          });
        } else {
          this.currentPost = this.db.object('/posts/' + params.key);

          // check to see if any approvals are awaiting on this post
          this.db.list('/approvals/posts', ref => ref.orderByChild('entityKey').equalTo(params.key)).snapshotChanges()
            .subscribe((approval:any) => {
              if (approval.length > 0 && approval[0]) {
                this.awaitingApproval = approval[0].key;
              }
          });
        }

        this.currentPost.valueChanges().subscribe((p:any) => {
          this.newURL = p.url;
          this.newDate = p.date;
          this.newTitle = p.title;
          this.newBody = p.body;
          this.newPublished = p.published;

          if (p.thumbnail) {
            this.imageUrl = p.thumbnail;
            this.newThumbnail = p.thumbnail;
          }
        });
      } else {
        this.newURL = null;
        this.newDate = null;
        this.newTitle = null;
        this.newThumbnail = null;
        this.newBody = null;
        this.newPublished = false;
      }
    });
  }

  handleFiles(e) {
    this.file = e.srcElement.files[0];
    if (this.file.size > 2097152) {
      let snackBarRef = this.snackBar.open('Images must be 2 MB or less', 'OK!', {
        duration: 3000
      });
    } else {
      this.uploadImage();
    }
  }

  uploadImage() {
    let storageRef = firebase.storage().ref();
    let path = Date.now().toString() + '-' + this.file.name;
    let iRef = storageRef.child('posts/' + path);
    let me = this;
    iRef.put(this.file).then((snapshot) => {
        let snackBarRef = this.snackBar.open('Image uploaded', 'OK!', {
          duration: 3000
        });
        this.storageRef.child('posts/' + path).getDownloadURL().then(function(url) {
          me.imageUrl = url;
          me.newThumbnail = url;
        });
    });
  }

  deleteImage() {
    this.newThumbnail = null;
  }

  deleteImageRef() {
    let storage = firebase.storage();
    let imageRef = storage.refFromURL(this.imageUrl);

    let me = this;
    imageRef.delete().then(function() {
      me.imageUrl = null;
    }).catch(function(error) {
      console.log('error', error);
    });
  }

  addPost(newURL: string, newDate: string, newTitle: string, newBody: string, newPublished: boolean) {
    if (!newPublished) {
      newPublished = false;
    }

    if (newURL && newDate && newTitle && newBody && this.currentAdmin.uid) {
      let date = new Date(newDate);
      let dateTime = date.getTime();

      let postObject = {
        url: newURL,
        dateUpdated: Date.now(),
        rdateUpdated: (Date.now() * -1),
        date: dateTime,
        title: newTitle,
        thumbnail: this.newThumbnail ? this.newThumbnail : null,
        body: newBody,
        published: newPublished,
        updatedBy: this.currentAdmin.uid,
        entityKey: this.editMode && this.postKey ? this.postKey : null
      };

      // if (this.imageUrl && !this.newThumbnail) {
      //   this.deleteImageRef();
      // }

      if (this.editMode && this.postKey) {
        this.currentPost = this.db.object('/posts/' + this.postKey);
        this.currentPost.update(postObject);
      } else {
          this.posts.push(postObject).then((item) => {
            this.db.object('/posts/' + item.key + '/entityKey').set(item.key);
          });
      }

      let snackBarRef = this.snackBar.open('Post saved', 'OK!', {
        duration: 3000
      });
    }

    this.validateFields(newURL, newTitle, newBody, newDate);
  }

  submitForModeration(newURL: string, newDate: string, newTitle: string, newBody: string, newPublished: boolean) {
    if (!newPublished) {
      newPublished = false;
    }

    if (newURL && newDate && newTitle && newBody && this.currentAdmin.uid) {
      let date = new Date(newDate);
      let dateTime = date.getTime();

      let approvalObject = {
        entityKey: this.router.url.includes('approval') ? this.entityObject.entityKey : this.postKey,
        url: newURL,
        dateUpdated: Date.now(),
        rdateUpdated: (Date.now() * -1),
        date: dateTime,
        title: newTitle,
        thumbnail: this.newThumbnail ? this.newThumbnail : null,
        body: newBody,
        published: newPublished,
        updatedBy: this.currentAdmin.uid
      };

      if (this.editMode && this.postKey) {

        this.currentModeratedPosts = this.db.list('/approvals/posts/');

        let adminApprovalPosts = this.db.list('/approvals/posts/', ref => ref.orderByChild('updatedBy').equalTo(this.currentAdmin.uid)).snapshotChanges();

        adminApprovalPosts.take(1).subscribe((approvals:any) => {
          console.log('approvals', approvals);

          let matchingApprovals = [];
          if (this.router.url.includes('approval')) {
            matchingApprovals = approvals.filter((match) => {
              return match.key === this.postKey;
            });
          } else {
            matchingApprovals = approvals.filter((match) => {
              return match.entityKey === this.postKey;
            });
          }

          if (matchingApprovals.length === 0) {
            this.currentModeratedPosts.push(approvalObject);
          } else {
            this.db.object('/approvals/posts/' + this.postKey).update(approvalObject);
          }
        });
      } else {
          this.db.list('/approvals/posts/').push(approvalObject);
      }
      let snackBarRef = this.snackBar.open('Post submitted for moderation', 'OK!', {
        duration: 3000
      });
      snackBarRef.onAction().subscribe(() => {
        this.router.navigateByUrl('admin/approvals');
      });
    }

    this.validateFields(newURL, newTitle, newBody, newDate);
  }

  approveItem(newURL: string, newDate: string, newTitle: string, newBody: string, newPublished: boolean) {
    if (this.entityObject.entityKey) {
      let ogEntity = this.db.object('/posts/' + this.entityObject.entityKey);
      ogEntity.set(this.entityObject);
    } else {
      this.db.list('/posts').push(this.entityObject);
    }

    this.db.object('/approvals/posts/' + this.entityObject.$key).remove();
    let snackBarRef = this.snackBar.open('Post approved', 'OK!', {
      duration: 3000
    });
    this.router.navigateByUrl('admin/posts');
  }

  deleteItem(event) {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/approvals/posts/' + this.postKey).remove();
        let snackBarRef = this.snackBar.open('Draft deleted', 'OK!', {
          duration: 3000
        });
        this.router.navigateByUrl('admin/posts')
      }
    });
  }

  validateFields(url: string, title: string, body: string, date: any) {
    if (!url) {
      let snackBarRef = this.snackBar.open('You must add a URL for this post', 'OK!', {
        duration: 3000
      });
    } else if (!title) {
      let snackBarRef = this.snackBar.open('You must add a title for this post', 'OK!', {
        duration: 3000
      });
    } else if (!body) {
      let snackBarRef = this.snackBar.open('You must add content to the post', 'OK!', {
        duration: 3000
      });
    } else if (!date) {
      let snackBarRef = this.snackBar.open('You must add a date to the post', 'OK!', {
        duration: 3000
      });
    }
  }
}

