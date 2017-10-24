import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { GlobalService } from 'app/services/global.service';
import { LocalCartService } from 'app/services/localcart.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  order: any;
  user: any;
  now: number;
  sources: AngularFireList<any[]>;
  charges: any;
  newCharge: any;

  constructor(
    public db: AngularFireDatabase,
    public router: Router,
    public globalService: GlobalService,
    public localCart: LocalCartService,
    private title: Title,
    private meta: Meta
  ) {
    this.charges = {};
    this.newCharge = {};
    this.order = globalService.order.getValue();
    this.user = globalService.user.getValue();
    const now = new Date().getTime();

    if (this.user) {
      this.sources = db.list('/stripe_customers/' + this.user.uid + '/sources');
    } else {
      router.navigateByUrl('cart');
    }

    if (this.sources) {
      this.sources.valueChanges().subscribe((s) => {
        this.newCharge.source = s[(s.length - 1)];
      });
    } else {
      router.navigateByUrl('cart');
    }

    if (this.order) {
      if (this.user) {
        this.order.uid = this.user.uid;
      }
      this.order.date = now;
      this.order.rdate = (now * -1);
      this.order.status = 'PAID';
    }

    if (!this.order || !this.order.billing) {
      router.navigateByUrl('cart');
    }
  }

  ngOnInit() {
    this.title.setTitle('Review');
    this.meta.updateTag({ content: 'Review items and information for the order' }, "name='description'");
  }

  confirm() {
    this.submitNewCharge();
    let newKey = Math.abs(this.globalService.hashCode(this.order.date) + this.globalService.hashCode(this.order.shipping.email));
    this.db.list('/orders').push(this.order).then((item) => {
      this.globalService.cart.next(null);
      this.globalService.order.next(null);
      this.localCart.clearAll();
      if (this.user) {
        this.db.object('/users/' + this.user.uid + '/cart').remove();
        this.db.object('/users/' + this.user.uid + '/orders/' + item.key).set(Date.now().toString());
      }
      this.router.navigateByUrl('checkout/confirmation');
    });
  }

  submitNewCharge() {
    this.db.list('/stripe_customers/' + this.user.uid + '/charges').push({
      source: this.newCharge.source.id,
      amount: Math.floor(this.order.total * 100)
    });
  }
}
