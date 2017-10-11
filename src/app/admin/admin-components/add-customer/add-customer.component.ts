import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  customers: AngularFireList<any>;
  customer: AngularFireObject<any>;
  newEmail: string;
  editMode: boolean;
  customerKey: string;

  constructor(
    public db: AngularFireDatabase,
    public snackBar: MdSnackBar,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.customers = db.list('/users');
  }

  addCustomer(newEmail: string) {
    if (newEmail) {
      if (this.editMode && this.customerKey) {
        this.db.object('/users/' + this.customerKey).update({
          email: newEmail
        });
      } else {
        this.customers.push({
          email: newEmail,
          status: 'inactive'
        });
      }

      let snackBarRef = this.snackBar.open('Customer saved', 'OK!', {
        duration: 3000
      });

    } else if (!newEmail) {
      let snackBarRef = this.snackBar.open('You must add an email for this customer', 'OK!', {
        duration: 3000
      });
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.uid) {
          this.editMode = true;
          this.customerKey = params.uid;
          this.db.object('/users/' + params.uid).valueChanges().subscribe((u: any) => {
            this.newEmail = u.email;
          });
        } else {
          this.newEmail = null;
        }
    });
  }
}

