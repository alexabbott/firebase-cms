import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'checkout-billing',
  templateUrl: './checkout-billing.component.html',
  styleUrls: ['./checkout-billing.component.css']
})
export class CheckoutBillingComponent implements OnInit {
  order: any;
  states: any;
  sameAsShipping: boolean;

  constructor(public globalService: GlobalService, public snackBar: MdSnackBar, public router: Router) {
    this.states = globalService.states;
    this.order = globalService.order.getValue();
    if (!this.order.shipping) {
      router.navigateByUrl('cart');
    }
    if (JSON.parse(window.localStorage.getItem('order')) && JSON.parse(window.localStorage.getItem('order')).billing) {
      this.order = JSON.parse(window.localStorage.getItem('order'));
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
          window.localStorage.setItem('order', JSON.stringify(this.order));
      } else {
          let snackBarRef = this.snackBar.open('You must complete the form', 'OK!', {
            duration: 3000
          });
      }
  }

  ngOnInit() {
    if (!this.order || this.order === {}) {
      this.router.navigateByUrl('checkout/shipping');
    }
  }

}
