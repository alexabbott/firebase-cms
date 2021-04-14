import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { MatSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-menus',
  templateUrl: './admin-menus.component.html',
  styleUrls: ['./admin-menus.component.scss']
})
export class AdminMenusComponent implements OnInit {

  nav: Observable<any>;
  selectedOption: any;
  dialogRef: MdDialogRef<any>;
  menuList: any;
  menuObject: any;

  constructor(
    public db: AngularFireDatabase,
    public snackBar: MatSnackBar,
    public dialog: MdDialog
  ) {
    this.menuList = [];
    this.menuObject = {};
    this.nav = db.list('/menus/nav').valueChanges();

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
    this.menuObject = this.menuList.reduce(function(acc, cur, i) {
      acc[i] = cur;
      return acc;
    }, {});
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
