import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'

@Component({
  selector: 'admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {

  users: FirebaseListObservable<any>;
  selectedOption: any;
  dialogRef: MdDialogRef<any>;

  constructor(public db: AngularFireDatabase, public dialog: MdDialog, public snackBar: MdSnackBar) {
    this.users = db.list('/users');
  }

  deleteUser(key: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/users/' + key).remove();

        let snackBarRef = this.snackBar.open('User deleted', 'OK!', {
          duration: 3000
        });
      }
    });
  }
}
