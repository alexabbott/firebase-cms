import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from '../../services/global.service';
import { LocalCartService } from '../../services/localcart.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productContent: any;
  product: any;
  globalCart: any;
  user: Observable<firebase.User>;
  currentShopper: any;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public snackBar: MdSnackBar,
    public route: ActivatedRoute,
    public router: Router,
    public globalService: GlobalService,
    public localCart: LocalCartService,
    private title: Title,
    private meta: Meta,
    private sanitizer: DomSanitizer
  ) {
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
            this.setJsonldData();

            this.title.setTitle(this.product.title);
            this.meta.updateTag({ content: 'View product details for ' + this.product.title }, "name='description'");

            this.globalService.cart.subscribe((cart) => {
              this.globalCart = cart;
              if (!cart) {
                this.globalCart = {};
              }
              this.localCart.cartUpdateItems(this.globalCart);
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

  private jsonld: any;
  public jsonLDString: any;
  private setJsonldData() {
    this.jsonld = {
      '@context': 'http://schema.org/',
      '@type': 'Product',
      'name': this.product.name,
      'image': this.product.thubmnail,
      'description': this.product.description,
      'offers': {
        '@type': 'Offer',
        'priceCurrency': 'USD',
        'price': this.product.price
      }
    };
    this.jsonLDString = '<script type="application/ld+json">' + JSON.stringify(this.jsonld) + '</script>';
    this.jsonLDString  = this.sanitizer.bypassSecurityTrustHtml(this.jsonLDString);
  }

}
