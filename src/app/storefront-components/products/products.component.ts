import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase) {
    this.products = db.list('/products', {
      query: {
        orderByChild: 'published',
        equalTo: true,
        limitToLast: 20,
      }
    });
  }

  getProductImage(product:any) {
    if (product.thumbnail) {
      return product.thumbnail;
    } else {
      return '../../assets/placeholder.jpg';
    }
  }

  ngOnInit() {
  }

}
