import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {

  constructor(public globalService: GlobalService) {
    globalService.order.subscribe((o) => {
      console.log('order payment', o);
    });
  }

  ngOnInit() {
  }

}
