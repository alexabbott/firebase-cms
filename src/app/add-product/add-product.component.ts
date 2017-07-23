import { Component, OnInit, Inject, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar } from '@angular/material';
import { GlobalService } from '../global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  products: FirebaseListObservable<any>;
  newTitle: string;
  newThumbnail: string;
  newDescription: string;
  newPrice: string;
  newPublished: boolean;
  currentAdmin: any;
  editMode: boolean;
  productKey: string;
  storageRef: any;
  file: any;
  imageUrl: any;
  currentProduct: FirebaseObjectObservable<any>;

  constructor(public af: FirebaseApp, public db: AngularFireDatabase, public snackBar: MdSnackBar, public globalService: GlobalService, public router: Router, public route: ActivatedRoute, private fb: FirebaseApp) {
    this.newPublished = false;
    this.products = db.list('/products');

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
      let iRef = storageRef.child('products/' + path);
      let me = this;
      iRef.put(this.file).then((snapshot) => {
          let snackBarRef = this.snackBar.open('Image uploaded', 'OK!', {
            duration: 3000
          });
          this.storageRef.child('products/' + path).getDownloadURL().then(function(url) {
            me.imageUrl = url;
            me.newThumbnail = url;

            if (me.editMode) {
              me.currentProduct.update({
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
        me.currentProduct.update({
          thumbnail: null
        });
      }
    }).catch(function(error) {
      console.log('error', error);
    });
  }

  addProduct(newTitle: string, newPrice: string, newDescription: string, newPublished: boolean) {

    if (!newPublished) {
      newPublished = false;
    }

    if (newTitle && newPrice && newDescription && this.currentAdmin.uid) {
      if (this.editMode && this.productKey) {

        this.currentProduct = this.db.object('/products/' + this.productKey);

        this.currentProduct.update({
          url: this.slugify(newTitle),
          dateAdded: Date.now(),
          title: newTitle,
          thumbnail: this.newThumbnail ? this.newThumbnail : null,
          description: newDescription,
          price: newPrice,
          published: newPublished,
          productedBy: this.currentAdmin.uid
        });
      } else {
          this.products.push({
            url: this.slugify(newTitle),
            dateAdded: Date.now(),
            title: newTitle,
            thumbnail: this.newThumbnail ? this.newThumbnail : null,
            description: newDescription,
            price: newPrice,
            published: newPublished,
            productedBy: this.currentAdmin.uid
          });
      }
      let snackBarRef = this.snackBar.open('Product saved', 'OK!', {
        duration: 3000
      });
      setTimeout(() => {
        this.router.navigateByUrl('admin/products');
      }, 3300);
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.key) {
          this.editMode = true;
          this.productKey = params.key;
          this.currentProduct = this.db.object('/products/' + params.key);

          this.currentProduct.subscribe(p => {
            this.newTitle = p.title;
            this.newDescription = p.description;
            this.newPrice = p.price;
            this.newPublished = p.published;

            if (p.thumbnail) {
              this.imageUrl = p.thumbnail;
              this.newThumbnail = p.thumbnail;
            }
          });
        } else {
          this.newTitle = null;
          this.newThumbnail = null;
          this.newDescription = null;
          this.newPrice = null;
          this.newPublished = false;
        }
    });
  }

  slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
}

