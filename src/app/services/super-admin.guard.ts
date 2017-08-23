import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { GlobalService } from '../services/global.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  currentUser: any;

  constructor(
    public router: Router,
    public db: AngularFireDatabase,
    public globalService: GlobalService
  ) {
    this.currentUser = globalService.user.getValue();
  }

  canActivate(): Promise<boolean> {
    return new Promise(Resolve => {
      if (this.currentUser) {
        this.db.list('/admins', {
          query: {
            orderByChild: 'email',
            equalTo: this.currentUser.email
          }
        }).subscribe((u) => {
          if (u[0].role === 'super-admin') {
            return Resolve(true);
          } else {
            this.router.navigate(['/admin']);
            return Resolve(false);
          }
        });
      }
    })
  }
}
