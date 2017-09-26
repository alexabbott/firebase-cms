import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.scss']
})
export class AdminCustomersComponent {

  customers: FirebaseListObservable<any>;
  selectedOption: any;
  dialogRef: MdDialogRef<any>;
  currentAdmin: any;

  constructor(
    public db: AngularFireDatabase,
    public dialog: MdDialog,
    public snackBar: MdSnackBar,
    public globalService: GlobalService
  ) {
    this.customers = db.list('/users');

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }

  deleteCustomer(event, key: string) {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/users/' + key).remove();

        let snackBarRef = this.snackBar.open('Customer deleted', 'OK!', {
          duration: 3000
        });
      }
    });
  }
}
