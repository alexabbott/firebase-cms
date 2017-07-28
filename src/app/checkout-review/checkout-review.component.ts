import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router }    from '@angular/router';

@Component({
  selector: 'checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit {
  order: any;

  constructor(public globalService: GlobalService, public router: Router) {
    this.order = globalService.order.getValue();
    if (!this.order.billing) {
      router.navigateByUrl('cart');
    }
  }

  ngOnInit() {
  }

}
