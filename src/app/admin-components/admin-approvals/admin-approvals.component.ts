import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'admin-approvals',
  templateUrl: './admin-approvals.component.html',
  styleUrls: ['./admin-approvals.component.scss']
})
export class AdminApprovalsComponent {

  productApprovals: FirebaseListObservable<any>;
  selectedOption: any;
  dialogRef: MdDialogRef<any>;
  currentAdmin: any;

  constructor(
    public db: AngularFireDatabase,
    public dialog: MdDialog,
    public snackBar: MdSnackBar,
    public globalService: GlobalService
  ) {
    this.productApprovals = db.list('/approvals/products');

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }
}
