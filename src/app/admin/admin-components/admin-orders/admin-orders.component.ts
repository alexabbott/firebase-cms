import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'
import { GlobalService } from 'app/services/global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  orders: FirebaseListObservable<any>;
  users: FirebaseListObservable<any>;
  selectedOption: String;
  currentAdmin: any;

  constructor(
    public db: AngularFireDatabase,
    public dialog: MdDialog,
    public snackBar: MdSnackBar,
    public globalService: GlobalService,
    public router: Router,
    public route: ActivatedRoute
  ) {

    this.users = db.list('/users');

    if (router.url.includes('customer')) {
      this.route.params.subscribe((params: Params) => {
        this.orders = db.list('/orders', {
          query: {
            orderByChild: 'uid',
            equalTo:  params.key,
            limitToFirst: 99999
          }
        });
      });
    } else {
      this.orders = db.list('/orders', {
        query: {
          orderByChild: 'rdate',
          limitToFirst: 99999
        }
      });
    }

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }

  ngOnInit() {
  }

  deleteOrder(event, key: string) {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/orders/' + key).remove();
        this.db.object('/users/orders/' + key).remove();

        let snackBarRef = this.snackBar.open('Order deleted', 'OK!', {
          duration: 3000
        });
      }
    });
  }
}