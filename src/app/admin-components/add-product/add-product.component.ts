import { Component, OnInit, Inject, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  products: FirebaseListObservable<any>;
  categories: FirebaseListObservable<any>;
  ogCategory: string;
  newTitle: string;
  newThumbnail: string;
  newDescription: string;
  newPrice: string;
  newPublished: boolean;
  newCategory: any;
  currentAdmin: any;
  editMode: boolean;
  productKey: string;
  storageRef: any;
  file: any;
  imageUrl: any;
  currentProduct: FirebaseObjectObservable<any>;
  currentModeratedProducts: FirebaseListObservable<any>;
  entityObject: any;
  dialogRef: MdDialogRef<any>;
  selectedOption: string;

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
    this.products = db.list('/products');
    this.categories = db.list('/categories');

    this.globalService.admin.subscribe(admin => {
      this.currentAdmin = admin;
    });

    this.storageRef = af.storage().ref();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.key) {
          this.editMode = true;
          this.productKey = params.key;

          if (this.router.url.includes('approval')) {
            this.currentProduct = this.db.object('/approvals/products/' + params.key);
            this.db.object('/approvals/products/' + params.key, { preserveSnapshot: true }).take(1).subscribe((p) => {
              if (p.val().category) {
                this.ogCategory = p.val().category;
              }
            });
            this.db.object('/approvals/products/' + this.productKey).subscribe((approvalProduct) => {
              this.entityObject = approvalProduct;
            });
          } else {
            this.currentProduct = this.db.object('/products/' + params.key);
            this.db.object('/products/' + params.key, { preserveSnapshot: true }).take(1).subscribe((p) => {
              if (p.val().category) {
                this.ogCategory = p.val().category;
              }
            });
          }

          this.currentProduct.subscribe(p => {
            this.newTitle = p.title;
            this.newDescription = p.description;
            this.newPrice = p.price;
            this.newPublished = p.published;
            this.newCategory = p.category;

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
          this.newCategory = null;
          this.newPublished = false;
        }
    });
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
        });
    });
  }

  deleteImage() {
    this.newThumbnail = null;
  }

  addProduct(newTitle: string, newPrice: string, newCategory: any, newDescription: string, newPublished: boolean) {
    if (!newPublished) {
      newPublished = false;
    }

    if (newTitle && newPrice && newDescription && this.currentAdmin.uid) {

      if (this.imageUrl && !this.newThumbnail) {
        let storage = firebase.storage();
        let imageRef = storage.refFromURL(this.imageUrl);

        let me = this;
        imageRef.delete().then(function() {
          me.imageUrl = null;
        }).catch(function(error) {
          console.log('error', error);
        });
      }

      if (this.editMode && this.productKey) {

        this.currentProduct = this.db.object('/products/' + this.productKey);

        this.currentProduct.update({
          url: this.slugify(newTitle),
          dateUpdated: Date.now(),
          rdateUpdated: (Date.now() * -1),
          title: newTitle,
          thumbnail: this.newThumbnail ? this.newThumbnail : null,
          description: newDescription,
          price: newPrice,
          published: newPublished,
          updatedBy: this.currentAdmin.uid,
          category: newCategory ? newCategory : null
        });

        // update or remove product from categories object
        if (this.ogCategory && this.newCategory) {
          this.db.object('/categories/' + this.ogCategory + '/products/' + this.productKey).remove();
          this.db.object('/categories/' + this.newCategory + '/products/' + this.productKey).set(Date.now());
        } else if (this.ogCategory && !this.newCategory) {
          this.db.object('/categories/' + this.ogCategory + '/products/' + this.productKey).remove();
        } else if (!this.ogCategory && this.newCategory) {
          this.db.object('/categories/' + this.newCategory + '/products/' + this.productKey).set(Date.now());
        }
      } else {
          this.products.push({
            url: this.slugify(newTitle),
            dateAdded: Date.now(),
            rdateAdded: (Date.now() * -1),
            dateUpdated: Date.now(),
            rdateUpdated: (Date.now() * -1),
            title: newTitle,
            thumbnail: this.newThumbnail ? this.newThumbnail : null,
            description: newDescription,
            price: newPrice,
            published: newPublished,
            addedBy: this.currentAdmin.uid,
            category: newCategory ? newCategory : null
          }).then((item) => {
            if (this.newCategory) {
              this.db.object('/categories/' + this.newCategory + '/products/' + item.key).set(Date.now());
            }
          });
      }
      let snackBarRef = this.snackBar.open('Product saved', 'OK!', {
        duration: 3000
      });
      setTimeout(() => {
        this.router.navigateByUrl('admin/products');
      }, 3300);
    } else if (!newTitle) {
      let snackBarRef = this.snackBar.open('You must add a title for this product', 'OK!', {
        duration: 3000
      });
    } else if (!newDescription) {
      let snackBarRef = this.snackBar.open('You must add a description to the product', 'OK!', {
        duration: 3000
      });
    } else if (!newPrice) {
      let snackBarRef = this.snackBar.open('You must add a price to the product', 'OK!', {
        duration: 3000
      });
    }
  }

  submitForModeration(newTitle: string, newPrice: string, newCategory: any, newDescription: string, newPublished: boolean) {
    if (!newPublished) {
      newPublished = false;
    }

    if (newTitle && newPrice && newDescription && this.currentAdmin.uid) {
      if (this.editMode && this.productKey) {
        this.currentModeratedProducts = this.db.list('/approvals/products/');

        let adminApprovalProducts = this.db.list('/approvals/products/', {
          query: {
            orderByChild: 'updatedBy',
            equalTo: this.currentAdmin.uid
          }
        });
        adminApprovalProducts.take(1).subscribe((approvals) => {
          let matchingApprovals = [];
          if (this.router.url.includes('approval')) {
            matchingApprovals = approvals.filter((match) => {
              return match.$key === this.productKey;
            });
          } else {
            matchingApprovals = approvals.filter((match) => {
              return match.entityKey === this.productKey;
            });
          }

          if (matchingApprovals.length === 0) {
            this.currentModeratedProducts.push({
              entityKey: this.productKey,
              url: this.slugify(newTitle),
              dateUpdated: Date.now(),
              rdateUpdated: (Date.now() * -1),
              title: newTitle,
              thumbnail: this.newThumbnail ? this.newThumbnail : null,
              description: newDescription,
              price: newPrice,
              published: newPublished,
              updatedBy: this.currentAdmin.uid,
              category: newCategory ? newCategory : null
            });
          } else {
            this.db.object('/approvals/products/' + this.productKey).update({
              entityKey: this.productKey,
              url: this.slugify(newTitle),
              dateUpdated: Date.now(),
              rdateUpdated: (Date.now() * -1),
              title: newTitle,
              thumbnail: this.newThumbnail ? this.newThumbnail : null,
              description: newDescription,
              price: newPrice,
              published: newPublished,
              updatedBy: this.currentAdmin.uid,
              category: newCategory ? newCategory : null
            });
          }
        });
      } else {
          this.db.list('/approvals/products/').push({
            url: this.slugify(newTitle),
            dateAdded: Date.now(),
            rdateAdded: (Date.now() * -1),
            dateUpdated: Date.now(),
            rdateUpdated: (Date.now() * -1),
            title: newTitle,
            thumbnail: this.newThumbnail ? this.newThumbnail : null,
            description: newDescription,
            price: newPrice,
            published: newPublished,
            addedBy: this.currentAdmin.uid,
            category: newCategory ? newCategory : null
          });
      }
      let snackBarRef = this.snackBar.open('Product submitted for moderation', 'OK!', {
        duration: 3000
      });
      snackBarRef.onAction().subscribe(() => {
        this.router.navigateByUrl('admin/approvals');
      });
      setTimeout(() => {
        this.router.navigateByUrl('admin/approvals');
      }, 3300);
    } else if (!newTitle) {
      let snackBarRef = this.snackBar.open('You must add a title for this product', 'OK!', {
        duration: 3000
      });
    } else if (!newDescription) {
      let snackBarRef = this.snackBar.open('You must add a description to the product', 'OK!', {
        duration: 3000
      });
    } else if (!newPrice) {
      let snackBarRef = this.snackBar.open('You must add a price to the product', 'OK!', {
        duration: 3000
      });
    }
  }

  approveItem(newTitle: string, newPrice: string, newCategory: any, newDescription: string, newPublished: boolean) {
    if (this.entityObject.entityKey) {
      let ogEntity = this.db.object('/products/' + this.entityObject.entityKey);
      ogEntity.take(1).subscribe((item) => {
        if (item.category && this.entityObject.category) {
          this.db.object('/categories/' + item.category + '/products/' + this.entityObject.entityKey).remove();
          this.db.object('/categories/' + this.entityObject.category + '/products/' + this.entityObject.entityKey).set(Date.now());
        } else if (item.category && !this.entityObject.category) {
          this.db.object('/categories/' + item.category + '/products/' + this.entityObject.entityKey).remove();
        } else if (!item.category && this.entityObject.category) {
          this.db.object('/categories/' + this.entityObject.category + '/products/' + this.entityObject.entityKey).set(Date.now());
        }
        ogEntity.set(this.entityObject);
      });
    } else {
      this.db.list('/products').push(this.entityObject).then((item) => {
        if (this.entityObject.category) {
          this.db.object('/categories/' + this.entityObject.category + '/products/' + item.key).set(Date.now());
        }
      });
    }

    this.db.object('/approvals/products/' + this.entityObject.$key).remove();
    let snackBarRef = this.snackBar.open('Product approved', 'OK!', {
      duration: 3000
    });
  }

  deleteItem(event) {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/approvals/products/' + this.productKey).remove();
        let snackBarRef = this.snackBar.open('Draft deleted', 'OK!', {
          duration: 3000
        });
        this.router.navigateByUrl('admin/products')
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

