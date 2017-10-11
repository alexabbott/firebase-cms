import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'

@Component({
  selector: 'admin-admins',
  templateUrl: './admin-admins.component.html',
  styleUrls: ['./admin-admins.component.scss']
})
export class AdminAdminsComponent {

  admins: Observable<any>;
  selectedOption: any;
  dialogRef: MdDialogRef<any>;
  adminsObject: any;

  constructor(public db: AngularFireDatabase, public dialog: MdDialog, public snackBar: MdSnackBar) {
    this.admins = db.list('/admins', ref => ref.orderByChild('email').limitToFirst(9999)).snapshotChanges();

    this.admins.subscribe((adminList:any) => {
      this.adminsObject = adminList;
    });
  }

  countAdmin(email:string) {
    let matches = this.adminsObject.filter((item) => {
      return item.payload.val().email === email;
    });
    return matches.length;
  }

  deleteAdmin(event, key: string) {
    event.stopPropagation();
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
