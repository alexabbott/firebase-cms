import { Component, OnInit, Inject, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { GlobalService } from '../../../services/global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseApp } from '@angular/fire';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  products: AngularFireList<any>;
  categories: Observable<any>;
  ogCategory: string;
  newTitle: string;
  newThumbnail: string;
  newDescription: string;
  newPrice: string;
  newPublished: boolean;
  newCategory: any;
  newWeight: number;
  currentAdmin: any;
  editMode: boolean;
  productKey: string;
  storageRef: any;
  file: any;
  imageUrl: any;
  currentProduct: AngularFireObject<any>;
  currentModeratedProducts: AngularFireList<any>;
  entityObject: any;
    dialogRef: MatDialogRef<any>;
  selectedOption: string;
  awaitingApproval: string;

  constructor(
    public af: FirebaseApp,
    public db: AngularFireDatabase,
    public snackBar: MatSnackBar,
    public globalService: GlobalService,
    public router: Router,
    public route: ActivatedRoute,
    private fb: FirebaseApp,
      public dialog: MatDialog
  ) {
    this.newPublished = false;
    this.products = db.list('/products');
    this.categories = db.list('/categories').snapshotChanges();

    this.globalService.admin.subscribe(admin => {
      this.currentAdmin = admin;

      let adminApprovalProducts = this.db.list('/approvals/products/', ref => ref.orderByChild('updatedBy').equalTo(this.currentAdmin.uid));
      adminApprovalProducts.valueChanges().subscribe(response => {
        console.log(!response);
      });
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
            this.db.object('/approvals/products/' + params.key).valueChanges().take(1).subscribe((p:any) => {
              if (p.category) {
                this.ogCategory = p.category;
              }
            });
            this.db.object('/approvals/products/' + this.productKey).valueChanges().subscribe((approvalProduct:any) => {
              this.entityObject = approvalProduct;
            });
          } else {
            this.currentProduct = this.db.object('/products/' + params.key);
            this.db.object('/products/' + params.key).valueChanges().take(1).subscribe((p:any) => {
              if (p.category) {
                this.ogCategory = p.category;
              }
            });

            // check to see if any approvals are awaiting on this product
            this.db.list('/approvals/products', ref => ref.orderByChild('entityKey').equalTo(params.key)).valueChanges()
              .subscribe((approval:any) => {
                if (approval.length > 0 && approval[0]) {
                  this.awaitingApproval = approval[0].key;
                }
            });
          }

          this.currentProduct.valueChanges().subscribe((p:any) => {
            this.newTitle = p.title;
            this.newDescription = p.description;
            this.newPrice = p.price;
            this.newPublished = p.published;
            this.newCategory = p.category;
            this.newWeight = p.weight;

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
          this.newWeight = 0;
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
    let storageRef = firebase.default.storage().ref();
    let path = Date.now().toString() + '-' + this.file.name;
    let imageRef = storageRef.child('products/' + path);
    let me = this;
    imageRef.put(this.file).then((snapshot) => {
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

  deleteImageRef() {
    let storage = firebase.default.storage();
    let imageRef = storage.refFromURL(this.imageUrl);

    let me = this;
    imageRef.delete().then(function() {
      me.imageUrl = null;
    }).catch(function(error) {
      console.log('error', error);
    });
  }

  validateFields(title, description, price) {
    if (!title) {
      let snackBarRef = this.snackBar.open('You must add a title for this product', 'OK!', {
        duration: 3000
      });
    } else if (!description) {
      let snackBarRef = this.snackBar.open('You must add a description to the product', 'OK!', {
        duration: 3000
      });
    } else if (!price) {
      let snackBarRef = this.snackBar.open('You must add a price to the product', 'OK!', {
        duration: 3000
      });
    }
  }

  updateCategory(ogCat: string, newCat: string, key: string) {
    if (ogCat && newCat) {
      this.db.object('/categories/' + ogCat + '/products/' + key).remove();
      this.db.object('/categories/' + newCat + '/products/' + key).set(Date.now().toString());
    } else if (ogCat && !newCat) {
      this.db.object('/categories/' + ogCat + '/products/' + key).remove();
    } else if (!ogCat && newCat) {
      this.db.object('/categories/' + newCat + '/products/' + key).set(Date.now().toString());
    }
  }

  addProduct(newTitle: string, newPrice: string, newCategory: any, newWeight: number, newDescription: string, newPublished: boolean) {
    if (!newPublished) {
      newPublished = false;
    }

    if (newTitle && newPrice && newDescription && this.currentAdmin.uid) {

      let productObject = {
        url: this.globalService.slugify(newTitle),
        dateUpdated: Date.now().toString(),
        rdateUpdated: (Date.now() * -1).toString(),
        title: newTitle,
        thumbnail: this.newThumbnail ? this.newThumbnail : null,
        description: newDescription,
        price: newPrice,
        published: newPublished,
        updatedBy: this.currentAdmin.uid,
        weight: newWeight,
        category: newCategory ? newCategory : null,
        entityKey: this.editMode && this.productKey ? this.productKey : null
      };

      // if (this.imageUrl && !this.newThumbnail) {
      //   this.deleteImageRef();
      // }

      if (this.editMode && this.productKey) {
        this.currentProduct = this.db.object('/products/' + this.productKey);
        this.currentProduct.update(productObject);
        this.updateCategory(this.ogCategory, this.newCategory, this.productKey);
      } else {
        this.products.push(productObject).then((item) => {
          if (this.newCategory) {
            this.db.object('/products/' + item.key + '/entityKey').set(item.key);
            this.db.object('/categories/' + this.newCategory + '/products/' + item.key).set(Date.now().toString());
          }
        });
      }

      let snackBarRef = this.snackBar.open('Product saved', 'OK!', {
        duration: 3000
      });
    }

    this.validateFields(newTitle, newDescription, newPrice);
  }

  submitForModeration(newTitle: string, newPrice: string, newCategory: any, newWeight: number, newDescription: string, newPublished: boolean) {
    if (!newPublished) {
      newPublished = false;
    }

    if (newTitle && newPrice && newDescription && this.currentAdmin.uid) {

      let approvalObject = {
        entityKey: this.router.url.includes('approval') ? this.entityObject.entityKey : this.productKey,
        url: this.globalService.slugify(newTitle),
        dateUpdated: Date.now().toString(),
        rdateUpdated: (Date.now() * -1).toString(),
        title: newTitle,
        thumbnail: this.newThumbnail ? this.newThumbnail : null,
        description: newDescription,
        price: newPrice,
        published: newPublished,
        weight: newWeight,
        updatedBy: this.currentAdmin.uid,
        category: newCategory ? newCategory : null
      };

      if (this.editMode && this.productKey) {

        this.currentModeratedProducts = this.db.list('/approvals/products/');

        let adminApprovalProducts = this.db.list('/approvals/products/', ref => ref.orderByChild('updatedBy').equalTo(this.currentAdmin.uid)).valueChanges();
        adminApprovalProducts.take(1).subscribe((approvals:any) => {

          let matchingApprovals = [];
          if (this.router.url.includes('approval')) {
            matchingApprovals = approvals.filter((match) => {
              return match.entityKey === this.entityObject.entityKey;
            });
          } else {
            matchingApprovals = approvals.filter((match) => {
              return match.entityKey === this.productKey;
            });
          }

          if (matchingApprovals.length === 0 || !this.router.url.includes('approval')) {
            this.currentModeratedProducts.push(approvalObject);
          } else {
            this.db.object('/approvals/products/' + this.productKey).update(approvalObject);
          }
        });
      } else {
          this.db.list('/approvals/products/').push(approvalObject);
      }
      let snackBarRef = this.snackBar.open('Product submitted for moderation', 'OK!', {
        duration: 3000
      });
      snackBarRef.onAction().subscribe(() => {
        this.router.navigateByUrl('admin/approvals');
      });
    }

    this.validateFields(newTitle, newDescription, newPrice);
  }

  approveItem(newTitle: string, newPrice: string, newCategory: any, newDescription: string, newPublished: boolean) {
    if (this.entityObject.entityKey) {
      let ogEntity = this.db.object('/products/' + this.entityObject.entityKey);
      ogEntity.valueChanges().take(1).subscribe((item:any) => {
        this.updateCategory(item.category, this.entityObject.category, this.entityObject.entityKey);
        ogEntity.set(this.entityObject);
      });
    } else {
      this.db.list('/products').push(this.entityObject).then((item) => {
        if (this.entityObject.category) {
          this.db.object('/categories/' + this.entityObject.category + '/products/' + item.key).set(Date.now());
        }
      });
    }

    this.db.object('/approvals/products/' + this.productKey).remove();
    let snackBarRef = this.snackBar.open('Product approved', 'OK!', {
      duration: 3000
    });
    this.router.navigateByUrl('admin/products');
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
}

