import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'

@Component({
  selector: 'app-admin-menus',
  templateUrl: './admin-menus.component.html',
  styleUrls: ['./admin-menus.component.css']
})
export class AdminMenusComponent implements OnInit {

  nav: FirebaseListObservable<any>;
  selectedOption: any;
  dialogRef: MdDialogRef<any>;
  menuList: any;
  menuObject: any;

  constructor(public db: AngularFireDatabase, public snackBar: MdSnackBar, public dialog: MdDialog) {
    this.menuList = [];
    this.menuObject = {};
    this.nav = db.list('/menus/nav');

    this.nav.subscribe(items => {
      this.menuList = [];
      for (let x = 0; x < items.length; x++) {
        this.menuList.push(items[x]);
      }
    });
  }

  addMenuItem() {
    this.menuList.push({
      label: '',
      url: ''
    });
  }

  saveMenu() {
    for (let i = 0; i < this.menuList.length; i++) {
      this.menuObject[i] = this.menuList[i];
    }
    this.db.object('/menus/nav').set(this.menuObject);
    let snackBarRef = this.snackBar.open('Menu saved', 'OK!', {
      duration: 3000
    });
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

  deleteMenuItem(index: Number) {
    this.menuList.splice(index, 1);
  }

  ngOnInit() {
  }

}
