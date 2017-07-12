import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-menus',
  templateUrl: './admin-menus.component.html',
  styleUrls: ['./admin-menus.component.css']
})
export class AdminMenusComponent implements OnInit {

  nav: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase, public snackBar: MdSnackBar) {
    this.nav = db.list('/menus/nav');
  }

  addMenuItem() {
    this.nav.push({
      label: '',
      url: ''
    })
  }

  saveMenuItem(key: string, newLabel: string, newURL: string) {
    this.db.object('/menus/nav/' + key).update({
      label: newLabel,
      url: newURL
    });
    let snackBarRef = this.snackBar.open('Menu item saved', 'OK!', {
      duration: 3000
    });
  }

  deleteMenuItem(key: string) {
    this.db.object('/menus/nav/' + key).remove();
    let snackBarRef = this.snackBar.open('Menu item deleted', 'OK!', {
      duration: 3000
    });
  }

  ngOnInit() {
  }

}
