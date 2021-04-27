import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'
import { GlobalService } from '../../../services/global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  orders: Observable<any[]>;
  users: Observable<any[]>;
  selectedOption: String;
  currentAdmin: any;

  constructor(
    public db: AngularFireDatabase,
      public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public globalService: GlobalService,
    public router: Router,
    public route: ActivatedRoute
  ) {

    this.users = db.list('/users').valueChanges();

    if (router.url.includes('customer')) {
      this.route.params.subscribe((params: Params) => {
        this.orders = db.list('/orders', ref => ref.orderByChild('uid').equalTo(params.key).limitToFirst(99999)).snapshotChanges();
      });
    } else {
      this.orders = db.list('/orders', ref => ref.orderByChild('rdate').limitToFirst(99999)).snapshotChanges();
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
