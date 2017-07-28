import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { GlobalService } from '../global.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productContent: any;
  product: any;
  globalCart: any;
  user: Observable<firebase.User>;
  currentShopper: any;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth, public snackBar: MdSnackBar, public route: ActivatedRoute, public router: Router, public globalService: GlobalService) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.productContent = this.db.list('/products', {
          query: {
            orderByChild: 'url',
            equalTo: params.url
          }
        });
        this.productContent.subscribe(p => {
          if (p[0].published) {
            this.product = p[0];

            this.globalService.cart.subscribe((cart) => {
              this.globalCart = cart;
              window.localStorage.setItem('cart', JSON.stringify(this.globalCart));
              if (this.globalCart && this.globalCart[this.product.$key]) {
                this.product.quantity = this.globalCart[this.product.$key]['quantity'];
              } else {
                this.product.quantity = 1;
                this.product.total = this.product.price;
              }
            });
          } else {
            this.product = {
              title: 'Product Not Found',
              body: ''
            }
          }
        });
    });
  }

  addToCart(item) {
    this.globalCart[item.$key] = item;
    this.globalCart[item.$key]['key'] = item.$key;
    this.globalCart[item.$key]['total'] = (item.quantity * item.price);
    this.globalService.cart.next(this.globalCart);

    let snackBarRef = this.snackBar.open('Product added to cart', 'View Cart', {
      duration: 3000
    });
    snackBarRef.onAction().subscribe(() => {
      this.router.navigateByUrl('cart');
    });
  }

}
