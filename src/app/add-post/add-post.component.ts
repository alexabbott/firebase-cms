import { Component, OnInit, Inject, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar } from '@angular/material';
import { GlobalService } from '../global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  @Input() folder: string;

  posts: FirebaseListObservable<any>;
  newURL: string;
  newDate: string;
  newTitle: string;
  newThumbnail: string;
  newBody: string;
  newPublished: boolean;
  currentUser: any;
  editMode: boolean;
  postKey: string;
  storageRef: any;
  file: any;
  imageUrl: any;

  constructor(public af: FirebaseApp, public db: AngularFireDatabase, public snackBar: MdSnackBar, public globalService: GlobalService, public route: ActivatedRoute, private fb: FirebaseApp) {
    this.newPublished = false;
    this.posts = db.list('/posts');

    this.globalService.user.subscribe(user => {
      this.currentUser = user;
    });

    this.storageRef = af.storage().ref();
  }

  handleFiles(e) {
    this.file = e.srcElement.files[0];
    this.readThis(this.file);
    this.uploadImage();
  }

  readThis(inputValue: any) : void {
    let file:File = this.file; 
    let myReader:FileReader = new FileReader();

    let me = this;

    myReader.onloadend = function(e){
      me.imageUrl = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  uploadImage() {
      let storageRef = firebase.storage().ref();
      let path = this.file.name;
      let iRef = storageRef.child(path);
      iRef.put(this.file).then((snapshot) => {
          this.newThumbnail = path;
          let snackBarRef = this.snackBar.open('Image uploaded', 'OK!', {
            duration: 3000
          });
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
          thumbnail: this.newThumbnail ? this.newThumbnail : null,
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
            thumbnail: this.newThumbnail ? this.newThumbnail : null,
            body: newBody,
            published: newPublished,
            postedBy: this.currentUser.uid
          });

          this.newURL = null;
          this.newDate = null;
          this.newTitle = null;
          this.newThumbnail = null;
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

            let me = this;
            
            if (p.thumbnail) {
              this.storageRef.child(p.thumbnail).getDownloadURL().then(function(url) {
                me.imageUrl = url;
                console.log('imageurl', url);
              });
            }
          });
        }
    });
  }
}

