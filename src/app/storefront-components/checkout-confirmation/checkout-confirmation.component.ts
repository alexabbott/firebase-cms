import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-checkout-confirmation',
  templateUrl: './checkout-confirmation.component.html',
  styleUrls: ['./checkout-confirmation.component.scss']
})
export class CheckoutConfirmationComponent implements OnInit {
  order: any;
  user: any;

  constructor(
    public router: Router,
    public globalService: GlobalService,
    private title: Title,
    private meta: Meta
  ) {
    this.order = globalService.order.getValue();
    this.user = globalService.user.getValue();
  }

  ngOnInit() {
    this.title.setTitle('Confirmation');
    this.meta.updateTag({ content: 'Order confirmation information' }, "name='description'");
  }

}
