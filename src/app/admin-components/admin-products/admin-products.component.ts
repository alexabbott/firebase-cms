import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { GlobalService } from '../../services/global.service';
import { Router }    from '@angular/router';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: FirebaseListObservable<any>;
  product: FirebaseObjectObservable<any>;
  selectedOption: any;
  dialogRef: MdDialogRef<any>;
  storageRef: any;

  constructor(public af: FirebaseApp, public db: AngularFireDatabase, public globalService: GlobalService, public router: Router, public dialog: MdDialog, public snackBar: MdSnackBar) {
    this.products = db.list('/products');

    this.storageRef = af.storage().ref();
  }

  onChange(e: any, key: string) {
    this.product = this.db.object('/products/' + key);
    if (e.checked) {
      this.product.update({published: true});
    } else {
      this.product.update({published: false});
    }
  }

  editProduct(key: string) {
    this.router.navigateByUrl('admin/edit-product/' + key);
  }

  deleteProduct(product: any) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/products/' + product.$key).remove();

        if (product.thumbnail) {
          let storage = firebase.storage();
          let imageRef = storage.refFromURL(product.thumbnail);
          let me = this;
          imageRef.delete().then(function() {
            let snackBarRef = me.snackBar.open('Product deleted', 'OK!', {
              duration: 3000
            });
          }).catch(function(error) {
            console.log('error', error);
          });
        } else {
          let snackBarRef = this.snackBar.open('Product deleted', 'OK!', {
            duration: 3000
          });
        }
      }
    });
  }

  ngOnInit() {
  }

}
