import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router }    from '@angular/router';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'

@Component({
  selector: 'admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss']
})
export class AdminPagesComponent implements OnInit {

  pages: FirebaseListObservable<any>;
  page: FirebaseObjectObservable<any>;
  selectedOption: any;
  dialogRef: MdDialogRef<any>;

  constructor(public db: AngularFireDatabase, public router: Router, public dialog: MdDialog, public snackBar: MdSnackBar) {
    this.pages = db.list('/pages');
  }

  onChange(e: any, key: string) {
    this.page = this.db.object('/pages/' + key);
    if (e.checked) {
      this.page.update({published: true});
    } else {
      this.page.update({published: false});
    }
  }

  editPage(key: string) {
    this.router.navigateByUrl('admin/edit-page/' + key);
  }

  deletePage(key: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/pages/' + key).remove();

        let snackBarRef = this.snackBar.open('Page deleted', 'OK!', {
          duration: 3000
        });
      }
    });
  }

  ngOnInit() {
  }

}