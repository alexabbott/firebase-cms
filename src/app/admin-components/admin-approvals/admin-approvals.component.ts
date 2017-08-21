import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ApproveDialogComponent } from '../approve-dialog/approve-dialog.component';
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

  approveItem(event, entity: string, key: string, entityObject: any) {
    event.stopPropagation();
    let dialogRef = this.dialog.open(ApproveDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'approve') {
        if (entityObject.entityKey) {
          this.db.object('/' + entity + '/' + entityObject.entityKey).update(entityObject);
        } else {
          this.db.list('/' + entity).push(entityObject);
        }
        this.db.object('/approvals/' + entity + '/' + key).remove();
        let snackBarRef = this.snackBar.open('Item approved', 'OK!', {
          duration: 3000
        });
      }
    });
  }

  deleteItem(event, entity: string, key: string) {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/approvals/' + entity + '/' + key).remove();

        let snackBarRef = this.snackBar.open('Item deleted', 'OK!', {
          duration: 3000
        });
      }
    });
  }
}
