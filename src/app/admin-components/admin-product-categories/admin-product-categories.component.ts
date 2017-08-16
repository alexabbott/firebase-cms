import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router }    from '@angular/router';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';

@Component({
  selector: 'app-admin-product-categories',
  templateUrl: './admin-product-categories.component.html',
  styleUrls: ['./admin-product-categories.component.scss']
})
export class AdminProductCategoriesComponent implements OnInit {

  categories: FirebaseListObservable<any>;
  dialogRef: MdDialogRef<any>;
  selectedOption: any;

  constructor(
    public db: AngularFireDatabase,
    public router: Router,
    public dialog: MdDialog,
    public snackBar: MdSnackBar
  ) {
    this.categories = db.list('/categories');
  }

  editCategory(key: string) {
    this.router.navigateByUrl('admin/edit-category/' + key);
  }

  deleteCategory(category: any) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/categories/' + category.$key).remove();

        let snackBarRef = this.snackBar.open('Category deleted', 'OK!', {
          duration: 3000
        });
      }
    });
  }

  ngOnInit() {
  }

}
