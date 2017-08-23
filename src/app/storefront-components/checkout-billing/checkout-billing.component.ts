import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { GlobalService } from 'app/services/global.service';
import { LocalCartService } from "app/services/localcart.service";

@Component({
  selector: 'checkout-billing',
  templateUrl: './checkout-billing.component.html',
  styleUrls: ['./checkout-billing.component.scss']
})
export class CheckoutBillingComponent implements OnInit {
  order: any;
  states: any;
  sameAsShipping: boolean;

  constructor(
    public snackBar: MdSnackBar,
    public router: Router,
    public globalService: GlobalService,
    public localCart: LocalCartService
  ) {
    this.states = globalService.states;
    this.order = globalService.order.getValue();
    if (!this.order.shipping) {
      router.navigateByUrl('cart');
    }
    if (this.localCart.orderHasItems() && this.localCart.orderHas('billing')) {
      this.order = this.localCart.orderGetItems();
    }
  }

  copyShipping() {
    if (this.sameAsShipping) {
      this.order.billing = this.order.shipping;
    } else {
      this.order.billing = {};
    }
  }

  goTo(url: string) {
    if (this.order.billing.name &&
        this.order.billing.email &&
        this.order.billing.address &&
        this.order.billing.city &&
        this.order.billing.state &&
        this.order.billing.zip) {
          this.globalService.order.next(this.order);
          this.router.navigateByUrl(url);
          this.localCart.orderUpdateItems(this.order);
      } else {
          let snackBarRef = this.snackBar.open('You must complete the form', 'OK!', {
            duration: 3000,
            extraClasses: ['warn-snackbar']
          });
      }
  }

  ngOnInit() {
    if (!this.order || this.order === {}) {
      this.router.navigateByUrl('checkout/shipping');
    }
  }

}
