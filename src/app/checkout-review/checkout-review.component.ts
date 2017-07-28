import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router }    from '@angular/router';

@Component({
  selector: 'checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit {
  order: any;
  user: any;


  constructor(public db: AngularFireDatabase, public globalService: GlobalService, public router: Router) {
    this.order = globalService.order.getValue();
    this.user = globalService.user.getValue();
    this.order.id = this.user.uid;

    if (!this.order.billing) {
      router.navigateByUrl('cart');
    }
  }

  confirm() {
    this.order.date = new Date();
    let newKey = this.hashCode(this.order.date) + this.hashCode(this.order.shipping.email);
    this.db.object('/orders/' + newKey).set(this.order);
    this.globalService.cart.next(null);
    this.globalService.order.next(null);
    window.localStorage.setItem('cart', null);
    window.localStorage.setItem('order', null);
    this.db.object('/users/' + this.user.uid + '/cart').remove();
    this.db.list('/users/' + this.user.uid + '/orders').push(newKey);
    this.router.navigateByUrl('checkout/confirmation');
  }

  hashCode(input:string) {
    let hash = 0, i, chr;
    if (input.length === 0) return hash;
    for (i = 0; i < input.length; i++) {
      chr   = input.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  ngOnInit() {
  }

}
