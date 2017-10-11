import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ApproveDialogComponent } from '../approve-dialog/approve-dialog.component';
import { GlobalService } from 'app/services/global.service';

@Component({
  selector: 'admin-approvals',
  templateUrl: './admin-approvals.component.html',
  styleUrls: ['./admin-approvals.component.scss']
})
export class AdminApprovalsComponent {

  productApprovals: Observable<any>;
  categoryApprovals: Observable<any>;
  pageApprovals: Observable<any>;
  postApprovals: Observable<any>;
  selectedOption: any;
  dialogRef: MdDialogRef<any>;
  users: Observable<any>;
  currentAdmin: any;

  constructor(
    public db: AngularFireDatabase,
    public dialog: MdDialog,
    public snackBar: MdSnackBar,
    public globalService: GlobalService
  ) {
    this.productApprovals = db.list('/approvals/products').snapshotChanges();
    this.categoryApprovals = db.list('/approvals/categories').snapshotChanges();
    this.pageApprovals = db.list('/approvals/pages').snapshotChanges();
    this.postApprovals = db.list('/approvals/posts').snapshotChanges();
    this.users = db.list('/users').valueChanges();

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }

  approveItem(event, entity: string, entityObject: any) {
    event.stopPropagation();
    let dialogRef = this.dialog.open(ApproveDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'approve') {
        if (entityObject.entityKey) {
          let ogEntity = this.db.object('/' + entity + '/' + entityObject.entityKey);
          ogEntity.valueChanges().take(1).subscribe((item:any) => {
            if (entity === 'products' && item.category && entityObject.category) {
              this.db.object('/categories/' + item.category + '/products/' + entityObject.entityKey).remove();
              this.db.object('/categories/' + entityObject.category + '/products/' + entityObject.entityKey).set(Date.now());
            } else if (entity === 'products' && item.category && !entityObject.category) {
              this.db.object('/categories/' + item.category + '/products/' + entityObject.entityKey).remove();
            } else if (entity === 'products' && !item.category && entityObject.category) {
              this.db.object('/categories/' + entityObject.category + '/products/' + entityObject.entityKey).set(Date.now());
            }
            ogEntity.set(entityObject);
          });
        } else {
          this.db.list('/' + entity).push(entityObject).then((item) => {
            if (entity === 'products' && entityObject.category) {
              this.db.object('/categories/' + entityObject.category + '/products/' + item.key).set(Date.now());
            }
          });
        }

        this.db.object('/approvals/' + entity + '/' + entityObject.$key).remove();
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
        this
        let snackBarRef = this.snackBar.open('Item deleted', 'OK!', {
          duration: 3000
        });
      }
    });
  }
}
