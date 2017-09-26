import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { GlobalService } from '../../../services/global.service';

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
  approvals: FirebaseObjectObservable<any>;
  approvalsTotal: number;
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
    this.approvals = db.object('/approvals');

    this.columns = 3;
    this.approvalsTotal = 0;

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }

  ngOnInit() {
    this.approvals.subscribe((a) => {
      if (a.products) {
        this.approvalsTotal += Object.keys(a.products).length;
      }
      if (a.pages) {
        this.approvalsTotal += Object.keys(a.pages).length;
      }
      if (a.posts) {
        this.approvalsTotal += Object.keys(a.posts).length;
      }
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

}
