import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'

@Component({
  selector: 'admin-admins',
  templateUrl: './admin-admins.component.html',
  styleUrls: ['./admin-admins.component.scss']
})
export class AdminAdminsComponent {

  admins: FirebaseListObservable<any>;
  selectedOption: any;
  dialogRef: MdDialogRef<any>;

  constructor(public db: AngularFireDatabase, public dialog: MdDialog, public snackBar: MdSnackBar) {
    this.admins = db.list('/admins', {
      query: {
        orderByChild: 'email',
        limitToFirst: 9999
      }
    });
  }

  deleteAdmin(key: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/admins/' + key).remove();

        let snackBarRef = this.snackBar.open('Admin deleted', 'OK!', {
          duration: 3000
        });
      }
    });
  }
}
