import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: FirebaseListObservable<any[]>;
  columns: Number;

  constructor(db: AngularFireDatabase) {
    this.products = db.list('/products', {
      query: {
        orderByChild: 'published',
        equalTo: true,
        limitToLast: 20,
      }
    });

    this.columns = 4;
  }

  getProductImage(product:any) {
    if (product.thumbnail) {
      return product.thumbnail;
    } else {
      return '../../assets/placeholder.jpg';
    }
  }

  onResize(event) {
    const element = event.target.innerWidth;

    if (element < 950) {
      this.columns = 2;
    }

    if (element > 950) {
      this.columns = 4;
    }

    if (element < 750) {
      this.columns = 1;
    }
  }

  ngOnInit() {
  }

}
