import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  posts: FirebaseListObservable<any>;
  pages: FirebaseListObservable<any>;
  admins: FirebaseListObservable<any>;
  products: FirebaseListObservable<any>;
  customers: FirebaseListObservable<any>;
  categories: FirebaseListObservable<any>;
  orders: FirebaseListObservable<any>;
  currentAdmin: any;
  columns: Number;

  constructor(public db: AngularFireDatabase, public globalService: GlobalService) {
    this.posts = db.list('/posts');
    this.pages = db.list('/pages');
    this.admins = db.list('/admins');
    this.customers = db.list('/users');
    this.products = db.list('/products');
    this.categories = db.list('/categories');
    this.orders = db.list('/orders');

    this.columns = 3;

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }

  onResize(event) {
    const element = event.target.innerWidth;

    if (element < 950) {
      this.columns = 2;
    }

    if (element > 950) {
      this.columns = 3;
    }

    if (element < 750) {
      this.columns = 1;
    }
  }

  ngOnInit() {
  }

}
