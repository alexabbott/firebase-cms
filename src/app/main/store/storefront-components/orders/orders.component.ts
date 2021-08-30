import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { GlobalService } from '@services/global.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  user: Observable<firebase.default.User>;
  userObject: any;
  userOrders: any;
  orderDates: any;

  constructor(
    public db: AngularFireDatabase,
    public globalService: GlobalService,
    public router: Router,
    public route: ActivatedRoute,
    public afAuth: AngularFireAuth,
    private title: Title,
    private meta: Meta
  ) {
    let userOrders;
    this.user = afAuth.authState;
    this.user.subscribe(currentUser => {
      if (currentUser && currentUser.uid) {
        this.userObject = currentUser;
        this.db.object('/users/' + currentUser.uid).valueChanges().subscribe((theuser:any) => {
          if (theuser && theuser.orders) {
            this.userOrders = Object.keys(theuser.orders);
            this.orderDates = Object.keys(theuser.orders).map(it => theuser.orders[it])
          }
        });
      } else {
        router.navigateByUrl('products');
      }
    });
  }

  ngOnInit() {
    this.title.setTitle('Orders');
    this.meta.updateTag({ content: 'View all of your past orders' }, "name='description'");
  }
}
