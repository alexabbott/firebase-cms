import { Component, OnInit } from '@angular/core';
import { Router }    from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: FirebaseListObservable<any[]>;
  user: Observable<firebase.User>;

  constructor(db: AngularFireDatabase, public globalService: GlobalService, public router: Router, public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    this.user.subscribe(currentUser => {
      if (currentUser && currentUser.uid) {
        this.orders = db.list('/orders', {
          query: {
            orderByChild: 'uid',
            equalTo: currentUser.uid,
            limitToLast: 20,
          }
        });
      } else {
        router.navigateByUrl('products');
      }
    });
  }

  ngOnInit() {
  }
}
