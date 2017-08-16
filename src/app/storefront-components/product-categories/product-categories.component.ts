import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {
  categories: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase) {
    this.categories = db.list('/categories');
  }

  ngOnInit() {
  }

}
