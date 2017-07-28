import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderContent: any;
  order: any;

  constructor(public db: AngularFireDatabase, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        console.log('params', params);
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
