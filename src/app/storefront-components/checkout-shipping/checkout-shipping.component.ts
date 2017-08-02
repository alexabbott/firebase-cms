import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'checkout-shipping',
  templateUrl: './checkout-shipping.component.html',
  styleUrls: ['./checkout-shipping.component.css']
})
export class CheckoutShippingComponent implements OnInit {
  order: any;
  states: any;

  constructor(public globalService: GlobalService, public snackBar: MdSnackBar, public router: Router) {
    this.states = globalService.states;
    this.order = globalService.order.getValue();
    if (!this.order.items) {
      router.navigateByUrl('cart');
    }
    if (JSON.parse(window.localStorage.getItem('order')) && JSON.parse(window.localStorage.getItem('order')).shipping) {
      this.order = JSON.parse(window.localStorage.getItem('order'));
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
          window.localStorage.setItem('order', JSON.stringify(this.order));
      } else {
          let snackBarRef = this.snackBar.open('You must complete the form', 'OK!', {
            duration: 3000
          });
      }
  }

  ngOnInit() {
  }

}
