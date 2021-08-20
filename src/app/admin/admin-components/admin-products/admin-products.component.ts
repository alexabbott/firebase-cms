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
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  products: Observable<any>;
  product: AngularFireObject<any>;
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
    this.products = db.list('/products', ref => ref.orderByChild('rdateUpdated').limitToLast(9999)).snapshotChanges();
    this.storageRef = af.storage().ref();

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }

  onChange(e: any, key: string) {
    this.product = this.db.object('/products/' + key);
    if (e.checked) {
      this.product.update({published: true});
    } else {
      this.product.update({published: false});
    }
  }

  deleteProduct(product: any) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/products/' + product.key).remove();
        if (product.category) {
          this.db.object('/categories/' + product.payload.val().category + '/products/' + product.key).remove();
        }

        // if (product.thumbnail) {
        //   let storage = firebase.storage();
        //   let imageRef = storage.refFromURL(product.thumbnail);
        //   let me = this;
        //   imageRef.delete().then(function() {
        //     let snackBarRef = me.snackBar.open('Product deleted', 'OK!', {
        //       duration: 3000
        //     });
        //   }).catch(function(error) {
        //     console.log('error', error);
        //   });
        // } else {
          let snackBarRef = this.snackBar.open('Product deleted', 'OK!', {
            duration: 3000
          });
        // }
      }
    });
  }

  ngOnInit() {
  }

}
