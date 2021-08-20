import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {
  categories: Observable<any>;

  constructor(
    public db: AngularFireDatabase,
    private title: Title,
    private meta: Meta
  ) {
    this.categories = db.list('/categories', ref => ref.orderByChild('weight').limitToLast(999)).valueChanges();
  }

  ngOnInit() {
    this.title.setTitle('Products');
    this.meta.updateTag({ content: 'Browse products and product categories' }, "name='description'");
  }

}
