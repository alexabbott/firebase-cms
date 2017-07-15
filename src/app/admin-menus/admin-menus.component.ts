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

  constructor(public db: AngularFireDatabase, public snackBar: MdSnackBar, public dialog: MdDialog) {
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
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/menus/nav/' + key).remove();
  
        let snackBarRef = this.snackBar.open('Menu item deleted', 'OK!', {
          duration: 3000
        });
      }
    });
  }

  ngOnInit() {
  }

}
