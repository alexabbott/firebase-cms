import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  userObject: any;

  constructor(db: AngularFireDatabase, public globalService: GlobalService, public router: Router, public route: ActivatedRoute, public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    if (!router.url.includes('/admin')) {
      this.user.subscribe(currentUser => {
        if (currentUser && currentUser.uid) {
          this.userObject = currentUser;
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
    } else {
      this.route.params.subscribe((params: Params) => {
        db.object('/users/' + params.key).subscribe(u => {
          this.userObject = u;
        });
        if (params && params.key) {
          this.orders = db.list('/orders', {
            query: {
              orderByChild: 'uid',
              equalTo: params.key,
              limitToLast: 20,
            }
          });
        }
      });
    }
  }

  ngOnInit() {
  }
}
