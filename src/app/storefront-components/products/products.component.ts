import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: FirebaseListObservable<any[]>;
  searchTerm: string;

  constructor(
    public db: AngularFireDatabase,
    public globalService: GlobalService
  ) {
    this.products = db.list('/products', {
      query: {
        orderByChild: 'published',
        equalTo: true,
        limitToLast: 20,
      }
    });

    this.globalService.searchTerm.subscribe((term) => {
      this.searchTerm = term;
    });
  }

  ngOnInit() {
  }

  getProductImage(product:any) {
    if (product.thumbnail) {
      return product.thumbnail;
    } else {
      return '../../assets/placeholder.jpg';
    }
  }
}
