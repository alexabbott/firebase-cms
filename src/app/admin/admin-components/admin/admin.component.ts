import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router }    from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { MdSnackBar } from '@angular/material';
import { GlobalService } from 'app/services/global.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  admin: Observable<firebase.User>;
  currentAdmin: any;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public router: Router,
    public globalService: GlobalService
  ) {
    this.admin = afAuth.authState;
    this.currentAdmin = {};

    this.admin.subscribe(currentAdmin => {
      if (!currentAdmin) {
        this.router.navigateByUrl('login');
      } else {
        this.globalService.admin.next(currentAdmin);
        this.db.object('/admins/' + this.globalService.hashCode(currentAdmin.email)).remove();
        this.db.object('/admins/' + currentAdmin.uid).subscribe((a) => {
          this.globalService.admin.next(a);
          this.currentAdmin.role = a.role;
        });
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }

}
