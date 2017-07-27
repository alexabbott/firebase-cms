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
    globalService.order.subscribe(currentOrder => {
      this.order = currentOrder;
      console.log('theorder', this.order);

      if (!currentOrder) {
        router.navigateByUrl('cart');
      }
    });
  }

  ngOnInit() {
  }

}
