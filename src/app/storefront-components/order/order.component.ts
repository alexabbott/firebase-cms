import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderContent: any;
  order: any;
  admin: boolean;
  customers: FirebaseListObservable<any>;

  constructor(
    public db: AngularFireDatabase,
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.admin = false;
    this.customers = db.list('/users');
  }

  ngOnInit() {
    if (this.router.url.includes('admin')) {
      this.admin = true;
    }

    this.route.params.subscribe((params: Params) => {
      this.title.setTitle('Order #' + params.key);
      this.meta.addTag({ name: 'description', content: 'View the details for an order' });

      this.orderContent = this.db.list('/orders', {
        query: {
          orderByKey: true,
          equalTo: params.key
        }
      });
      this.orderContent.subscribe(o => {
        if (o[0]) {
          this.order = o[0];
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
