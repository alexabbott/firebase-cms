import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { GlobalService } from 'app/services/global.service';
import { LocalCartService } from "app/services/localcart.service";

@Component({
  selector: 'checkout-shipping',
  templateUrl: './checkout-shipping.component.html',
  styleUrls: ['./checkout-shipping.component.css']
})
export class CheckoutShippingComponent implements OnInit {
  order: any;
  states: any;

  constructor(
    public snackBar: MdSnackBar,
    public router: Router,
    public globalService: GlobalService,
    public localCart: LocalCartService
  ) {
    this.states = globalService.states;
    this.order = globalService.order.getValue();
    if (!this.order.items) {
      router.navigateByUrl('cart');
    }
    if (this.localCart.orderHasItems() && this.localCart.orderHas('shipping')) {
      this.order = this.localCart.orderGetItems();
    }
  }

  goTo(url: string) {
    if (this.order.shipping.name &&
        this.order.shipping.email &&
        this.order.shipping.address &&
        this.order.shipping.city &&
        this.order.shipping.state &&
        this.order.shipping.zip) {
          this.globalService.order.next(this.order);
          this.router.navigateByUrl(url);
          this.localCart.orderUpdateItems(this.order);
      } else {
          let snackBarRef = this.snackBar.open('You must complete the form', 'OK!', {
            duration: 3000
          });
      }
  }

  ngOnInit() {
  }

}
