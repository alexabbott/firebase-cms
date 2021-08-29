import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { GlobalService } from '@services/global.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Observable<any[]>;
  searchTerm: string;

  constructor(
    public db: AngularFireDatabase,
    public globalService: GlobalService,
    public router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.products = db.list('/products', ref => ref.orderByChild('published').equalTo(true).limitToLast(20)).valueChanges();

    this.globalService.searchTerm.subscribe((term) => {
      this.searchTerm = term;
    });
  }

  ngOnInit() {
    this.title.setTitle('Products');
    this.meta.updateTag({ content: 'View all products' }, "name='description'");

    if (this.router.url.includes('product')) {
      this.globalService.searchTerm.next('');
    }
  }

  getProductImage(product:any) {
    if (product.thumbnail) {
      return product.thumbnail;
    } else {
      return '../../assets/placeholder.jpg';
    }
  }
}
