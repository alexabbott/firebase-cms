import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar } from '@angular/material';
import { GlobalService } from 'app/services/global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  orders: FirebaseListObservable<any>;
  order: any;
  editMode: boolean;
  orderKey: string;
  states: any;
  statuses: Array<any>;
  users: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase, public snackBar: MdSnackBar, public globalService: GlobalService, public router: Router, public route: ActivatedRoute) {
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
          this.db.object('/orders/' + params.key).subscribe(o => {
            this.order = o;
          });
        } else {
          this.order = { shipping: {}, billing: {} };
        }
    });
  }

}

