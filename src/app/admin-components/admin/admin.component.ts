import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router }    from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { MdSnackBar } from '@angular/material';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  admin: Observable<firebase.User>;
  admins: FirebaseListObservable<any>;
  currentAdmin: any;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth, public router: Router, public globalService: GlobalService) {
    this.admin = afAuth.authState;
    this.currentAdmin = {};

    this.admin.subscribe(currentAdmin => {
      if (!currentAdmin) {
        this.router.navigateByUrl('login');
      } else {
        this.globalService.admin.next(currentAdmin);
        this.db.list('/admins', {
          query: {
            orderByChild: 'email',
            equalTo: currentAdmin.email
          }
        }).subscribe((a) => {
          this.globalService.admin.next(a[0]);
          this.currentAdmin.role = a[0].role;
        });
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  hashCode(input:string) {
    let hash = 0, i, chr;
    if (input.length === 0) return hash;
    for (i = 0; i < input.length; i++) {
      chr   = input.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  ngOnInit() {
  }

}
