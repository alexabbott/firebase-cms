import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  nav: FirebaseListObservable<any>;
  theme: FirebaseObjectObservable<any>;

  constructor(public router: Router, public db: AngularFireDatabase) {
    this.nav = db.list('/menus/nav');
    this.theme = db.object('/theme');
  }
}
