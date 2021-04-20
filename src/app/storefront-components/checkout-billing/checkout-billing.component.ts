import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from '../../../services/global.service';
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
    public snackBar: MatSnackBar,
    public router: Router,
    public globalService: GlobalService,
    public localCart: LocalCartService,
    private title: Title,
    private meta: Meta
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

  ngOnInit() {
    this.title.setTitle('Billing');
    this.meta.updateTag({ content: 'Billing info for the order' }, "name='description'");

    if (!this.order || this.order === {}) {
      this.router.navigateByUrl('checkout/shipping');
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
}
