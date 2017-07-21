import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productContent: any;
  product: any;

  constructor(public db: AngularFireDatabase, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.productContent = this.db.list('/products', {
          query: {
            orderByChild: 'url',
            equalTo: params.url
          }
        });
        this.productContent.subscribe(p => {
          if (p[0].published) {
            this.product = p[0];
          } else {
            this.product = {
              title: 'Product Not Found',
              body: ''
            }
          }
        });
    });
  }

}
