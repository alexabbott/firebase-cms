import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router }    from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
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
  currentAdminID: string;

  constructor(public afAuth: AngularFireAuth, public router: Router, public globalService: GlobalService) {
    this.admin = afAuth.authState;

    this.admin.subscribe(currentAdmin => {
      if (!currentAdmin) {
        this.router.navigateByUrl('login');
      } else {
        this.globalService.admin.next(currentAdmin);
        this.currentAdminID = currentAdmin.uid;
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }

}
