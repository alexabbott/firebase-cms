import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  user: Observable<firebase.User>;
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
        this.db.object('/users/' + currentUser.uid).subscribe((theuser) => {
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
    this.meta.addTag({ name: 'description', content: 'View all of your past orders' });
  }
}
