import { Component, OnInit, Inject, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar } from '@angular/material';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  posts: FirebaseListObservable<any>;
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
  currentPost: FirebaseObjectObservable<any>;

  constructor(
    public af: FirebaseApp,
    public db: AngularFireDatabase,
    public snackBar: MdSnackBar,
    public globalService: GlobalService,
    public router: Router,
    public route: ActivatedRoute,
    private fb: FirebaseApp
  ) {

    this.newPublished = false;
    this.posts = db.list('/posts');

    this.globalService.admin.subscribe(admin => {
      this.currentAdmin = admin;
    });

    this.storageRef = af.storage().ref();
  }

  handleFiles(e) {
    this.file = e.srcElement.files[0];
    this.uploadImage();
  }

  uploadImage() {
      let storageRef = firebase.storage().ref();
      let path = this.file.name;
      let iRef = storageRef.child('posts/' + path);
      let me = this;
      iRef.put(this.file).then((snapshot) => {
          let snackBarRef = this.snackBar.open('Image uploaded', 'OK!', {
            duration: 3000
          });
          this.storageRef.child('posts/' + path).getDownloadURL().then(function(url) {
            me.imageUrl = url;
            me.newThumbnail = url;

            if (me.editMode) {
              me.currentPost.update({
                thumbnail: url
              });
            }
          });
      });
  }

  deleteImage() {
    let storage = firebase.storage();
    let imageRef = storage.refFromURL(this.imageUrl);

    let me = this;
    imageRef.delete().then(function() {
      me.imageUrl = null;
      me.newThumbnail = null;
      let snackBarRef = me.snackBar.open('Image deleted', 'OK!', {
        duration: 3000
      });
      if (me.editMode) {
        me.currentPost.update({
          thumbnail: null
        });
      }
    }).catch(function(error) {
      console.log('error', error);
    });
  }

  addPost(newURL: string, newDate: string, newTitle: string, newBody: string, newPublished: boolean) {
    let date = new Date(newDate);
    let dateTime = date.getTime();

    if (!newPublished) {
      newPublished = false;
    }

    if (newURL && newDate && newTitle && newBody && this.currentAdmin.uid) {
      if (this.editMode && this.postKey) {

        this.currentPost = this.db.object('/posts/' + this.postKey);

        this.currentPost.update({
          url: newURL,
          dateAdded: Date.now(),
          date: dateTime,
          title: newTitle,
          thumbnail: this.newThumbnail ? this.newThumbnail : null,
          body: newBody,
          published: newPublished,
          postedBy: this.currentAdmin.uid
        });
      } else {
          this.posts.push({
            url: newURL,
            dateAdded: Date.now(),
            date: dateTime,
            title: newTitle,
            thumbnail: this.newThumbnail ? this.newThumbnail : null,
            body: newBody,
            published: newPublished,
            postedBy: this.currentAdmin.uid
          });
      }
      let snackBarRef = this.snackBar.open('Post saved', 'OK!', {
        duration: 3000
      });
      setTimeout(() => {
        this.router.navigateByUrl('admin/posts');
      }, 3300);
    } else if (!newURL) {
      let snackBarRef = this.snackBar.open('You must add a URL for this post', 'OK!', {
        duration: 3000
      });
    } else if (!newTitle) {
      let snackBarRef = this.snackBar.open('You must add a title for this post', 'OK!', {
        duration: 3000
      });
    } else if (!newBody) {
      let snackBarRef = this.snackBar.open('You must add content to the post', 'OK!', {
        duration: 3000
      });
    } else if (!newDate) {
      let snackBarRef = this.snackBar.open('You must add a date to the post', 'OK!', {
        duration: 3000
      });
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.key) {
          this.editMode = true;
          this.postKey = params.key;
          this.currentPost = this.db.object('/posts/' + params.key);

          this.currentPost.subscribe(p => {
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
}

