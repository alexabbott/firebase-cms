import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
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
  categoryObject: any;
  categoryName: string;
  categoryProducts: any;
  @Input() categoryInput: any;

  constructor(
    public db: AngularFireDatabase,
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.categories = db.list('/categories');
    this.products = db.list('/products', {
      query: {
        orderByChild: 'published',
        equalTo: true
      }
    });

    this.categoryObject = {};
  }

  getProductImage(product:any) {
    if (product && product.thumbnail) {
      return product.thumbnail;
    } else {
      return '../../assets/placeholder.jpg';
    }
  }

  ngOnInit() {

    if (this.categoryInput) {
      this.category = this.categoryInput;
      this.categoryObject.slug = this.categoryInput.slug;
      this.categoryObject.name = this.categoryInput.name;
      this.categoryObject.products = Object.keys(this.categoryInput.products);
    } else {
      this.route.params.subscribe((params: Params) => {
        this.category = this.db.list('/categories', {
          query: {
            orderByChild: 'slug',
            equalTo: params.slug
          }
        });

        this.category.subscribe((cat) => {
          this.categoryObject.slug = cat[0].slug;
          this.categoryObject.name = cat[0].name;
          this.categoryObject.products = Object.keys(cat[0].products);

          this.title.setTitle(this.categoryObject.name);
          this.meta.addTag({ name: 'description', content: 'View all products in the ' + this.categoryObject.name + ' category' });
        });
      });
    }
  }
}
