import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  orders: AngularFireList<any>;
  order: any;
  editMode: boolean;
  orderKey: string;
  states: any;
  statuses: Array<any>;
  users: AngularFireList<any>;

  constructor(
    public db: AngularFireDatabase,
    public snackBar: MatSnackBar,
    public globalService: GlobalService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.states = globalService.states;
    this.statuses = globalService.orderStatuses;
    this.orders = db.list('/orders');
    this.users = db.list('/users');
    this.order = { shipping: {}, billing: {} };
  }

  addOrder(newOrder) {
    if (newOrder) {
      if (this.editMode && this.orderKey) {
        this.db.object('/orders/' + this.orderKey).update(newOrder);
      } else {
        this.orders.push(newOrder);
      }

      let snackBarRef = this.snackBar.open('Order saved', 'OK!', {
        duration: 3000
      });
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.key) {
          this.editMode = true;
          this.orderKey = params.key;
          this.db.object('/orders/' + params.key).valueChanges().subscribe((o:any) => {
            this.order = o;
          });
        } else {
          this.order = { shipping: {}, billing: {} };
        }
    });
  }

}

