import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-checkout-confirmation',
  templateUrl: './checkout-confirmation.component.html',
  styleUrls: ['./checkout-confirmation.component.css']
})
export class CheckoutConfirmationComponent implements OnInit {
  order: any;

  constructor(public router: Router, public globalService: GlobalService) {
    this.order = globalService.order.getValue();
  }

  ngOnInit() {
  }

}
