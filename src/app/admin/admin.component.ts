import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.scss']
})
export class AdminComponent implements OnInit,OnDestroy {

  user$: Observable<firebase.default.User>;
  currentAdmin: any;
  mobileQuery: MediaQueryList;
  subscriptions: Subscription[] = [];

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public router: Router,
    public globalService: GlobalService,
    public snackBar: MatSnackBar,
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.user$ = afAuth.authState;
    this.currentAdmin = {};
  }

  ngOnInit() {

    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(this.mobileQueryListener.bind(this));

    const onUser$ =  this.user$.subscribe(currentUser => {
      if (!currentUser) {
        this.router.navigateByUrl('login');
      } else {
        this.db.object('/admins/' + this.globalService.hashCode(currentUser.email)).valueChanges().subscribe((a: any) => {
          if (a && a.email) {
            this.globalService.admin.next(currentUser);
            this.db.object('/admins/' + currentUser.uid).valueChanges().subscribe((a: any) => {
              this.globalService.admin.next(a);
              this.currentAdmin.role = a.role;
            });
          } else {
            this.router.navigateByUrl('');
            let snackBarRef = this.snackBar.open('You are not an authorized administrator', 'OK!', {
              duration: 3000
            });
          }
        }, (err) => {
          console.log('Permission Error', err);
          this.router.navigateByUrl('');
          let snackBarRef = this.snackBar.open('You are not an authorized administrator', 'OK!', {
            duration: 3000
          });
        });
      }
    });

    this.subscriptions = [...this.subscriptions, onUser$];


  }

  mobileQueryListener() {
    this.changeDetectorRef.detectChanges();
  }

  logout() {
    this.afAuth.signOut();
  }

  ngOnDestroy() {

    if (this.subscriptions?.length) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }

    this.mobileQuery.removeListener(this.mobileQueryListener);

  }

}
