import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderContent: any;
  order: any;
  admin: boolean;
  customers: Observable<any>;

  constructor(
    public db: AngularFireDatabase,
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.admin = false;
    this.customers = db.list('/users').valueChanges();
  }

  ngOnInit() {
    if (this.router.url.includes('admin')) {
      this.admin = true;
    }

    this.route.params.subscribe((params: Params) => {
      this.title.setTitle('Order #' + params.key);
      this.meta.updateTag({ content: 'View the order dtails' }, "name='description'");

      this.orderContent = this.db.object('/orders/' + params.key);
      this.orderContent.valueChanges().subscribe((o) => {
        if (o) {
          this.order = o;
          this.order.key = params.key;
        } else {
          this.order = {
            title: 'Order Not Found',
            body: ''
          }
        }
      });
    });
  }
}
