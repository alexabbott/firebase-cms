import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from '../../services/global.service';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MdSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import * as firebase from 'firebase/app';

@Component({
  selector: 'checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {

  sources: FirebaseListObservable<any[]>;
  stripeCustomerInitialized: Boolean;
  newCreditCard: any;
  user: any;
  anonymous: Observable<firebase.User>;
  order: any;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public globalService: GlobalService,
    public router: Router,
    public snackBar: MdSnackBar
  ) {
    this.user = globalService.user.getValue();
    this.order = globalService.order.getValue();

    if (!this.order || !this.order.billing || !this.order.billing.zip) {
      this.router.navigateByUrl('cart');
    }

    if (this.user) {
      this.sources = db.list('/stripe_customers/' + this.user.uid + '/sources');
    } else {
      this.afAuth.auth.signInAnonymously().catch(function(error) {
        console.log('auth error', error.message);
      }).then(() => {
        this.anonymous = afAuth.authState;
        this.anonymous.subscribe(anonymousUser => {
          if (anonymousUser && anonymousUser.isAnonymous) {
            this.user = anonymousUser;
            this.sources = db.list('/stripe_customers/' + this.user.uid + '/sources');
          }
        });
      });
    }

    this.newCreditCard = {
      number: '4242424242424242',
      cvc: '111',
      exp_month: 1,
      exp_year: 2020,
      address_zip: '00000'
    };
  }

  submitNewCreditCard() {
    if (this.newCreditCard.number && this.newCreditCard.cvc && this.newCreditCard.exp_month && this.newCreditCard.exp_year) {
      (<any>window).Stripe.card.createToken({
        number: this.newCreditCard.number,
        cvc: this.newCreditCard.cvc,
        exp_month: this.newCreditCard.exp_month,
        exp_year: this.newCreditCard.exp_year,
        address_zip: this.order.billing.zip
      }, (status, response) => {
        if (response.error) {
          this.newCreditCard.error = response.error.message;
        } else {
          this.sources.push({token: response.id}).then(() => {
            this.newCreditCard = {
              number: '',
              cvc: '',
              exp_month: 1,
              exp_year: 2017,
              address_zip: ''
            };
            this.router.navigateByUrl('checkout/review');
          });
        }
      });
    } else {
      let snackBarRef = this.snackBar.open('You must complete the form', 'OK!', {
        duration: 3000,
        extraClasses: ['warn-snackbar']
      });
    }
  }

  ngOnInit() {
    (<any>window).Stripe.setPublishableKey(environment.stripe);
  }

}
