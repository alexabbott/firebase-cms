import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: FirebaseListObservable<any>;
  users: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase) {
    this.orders = db.list('/orders');
    this.users = db.list('/users');
  }

  ngOnInit() {
  }

}