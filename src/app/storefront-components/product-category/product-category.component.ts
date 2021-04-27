import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  products: Observable<any[]>;
  categories: Observable<any[]>;
  category: Observable<any[]>;
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
    this.categories = db.list('/categories').valueChanges();
    this.products = db.list('/products', ref => ref.orderByChild('published').equalTo(true)).valueChanges();
    this.categoryObject = {};
  }

  ngOnInit() {
    if (this.categoryInput) {
      this.category = this.categoryInput;
      this.categoryObject.slug = this.categoryInput.slug;
      this.categoryObject.name = this.categoryInput.name;
      this.categoryObject.products = Object.keys(this.categoryInput.products);
      this.products.subscribe((p:any) => {
        this.categoryProducts = p.filter((item) => {
          return item.category === this.categoryInput.entityKey;
        });
      });
    } else {
      this.route.params.subscribe((params: Params) => {
        this.category = this.db.list('/categories', ref => ref.orderByChild('slug').equalTo(params.slug)).valueChanges();

        this.category.subscribe((cat:any) => {
          this.categoryObject.slug = cat[0].slug;
          this.categoryObject.name = cat[0].name;
          this.categoryObject.products = Object.keys(cat[0].products);
          this.products.subscribe((p:any) => {
            this.categoryProducts = p.filter((item:any) => {
              return item.category === cat[0].entityKey;
            });
          });

          this.title.setTitle(this.categoryObject.name);
          this.meta.addTag({ name: 'description', content: 'View all products in the ' + this.categoryObject.name + ' category' });
        });
      });
    }
  }

  getProductImage(product:any) {
    if (product && product.thumbnail) {
      return product.thumbnail;
    } else {
      return '../../assets/placeholder.jpg';
    }
  }
}
