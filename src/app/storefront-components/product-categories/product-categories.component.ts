import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {
  categories: FirebaseListObservable<any[]>;

  constructor(
    public db: AngularFireDatabase,
    private title: Title,
    private meta: Meta
  ) {
    this.categories = db.list('/categories');
  }

  ngOnInit() {
    this.title.setTitle('Products');
    this.meta.updateTag({ content: 'Browse products and product categories' }, "name='description'");
  }

}
