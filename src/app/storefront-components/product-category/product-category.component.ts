import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  products: FirebaseListObservable<any[]>;
  categories: FirebaseListObservable<any[]>;
  category: FirebaseListObservable<any[]>;
  categoryName: string;
  columns: Number;

  constructor(
    public db: AngularFireDatabase,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.categories = db.list('/categories');
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

    this.route.params.subscribe((params: Params) => {
      this.category = this.db.list('/categories', {
        query: {
          orderByChild: 'slug',
          equalTo: params.slug
        }
      });

      this.category.subscribe((cat) => {
        this.categoryName = cat[0].name;

        this.products = this.db.list('/products', {
          query: {
            orderByChild: 'category',
            equalTo: cat[0].$key,
            limitToFirst: this.router.url.includes('/category') ? 100 : 3
          }
        });
      });
    });
  }
}
