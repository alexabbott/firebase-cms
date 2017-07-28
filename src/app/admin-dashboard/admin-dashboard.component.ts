import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  posts: FirebaseListObservable<any>;
  pages: FirebaseListObservable<any>;
  admins: FirebaseListObservable<any>;
  products: FirebaseListObservable<any>;
  customers: FirebaseListObservable<any>;
  orders: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase) {
    this.posts = db.list('/posts');
    this.pages = db.list('/pages');
    this.admins = db.list('/admins');
    this.customers = db.list('/users');
    this.products = db.list('/products');
    this.orders = db.list('/orders');
  }

  ngOnInit() {
  }

}
