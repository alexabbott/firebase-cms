import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from '../../../services/global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { take } from 'rxjs/operators'

@Component({
  selector: 'add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.scss']
})
export class AddProductCategoryComponent implements OnInit {

  categories: AngularFireList<any>;
  category: AngularFireObject<any>;
  newName: string;
  newWeight: number;
  newProducts: any;
  editMode: boolean;
  categoryKey: string;
  currentAdmin: any;
  selectedOption: string;
  currentModeratedCategories: AngularFireList<any>;
  entityObject: any;
  currentCategory: any;
  awaitingApproval: string;

  constructor(
    public db: AngularFireDatabase,
    public snackBar: MatSnackBar,
    public router: Router,
    public route: ActivatedRoute,
    public globalService: GlobalService,
    public dialog: MatDialog
  ) {
    this.categories = db.list('/categories');

    this.globalService.admin.subscribe(admin => {
      this.currentAdmin = admin;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.key) {
          this.editMode = true;
          this.categoryKey = params.key;

          if (this.router.url.includes('approval')) {
            this.currentCategory = this.db.object('/approvals/categories/' + params.key);
            this.db.object('/approvals/categories/' + this.categoryKey).valueChanges().subscribe((approvalCategory:any) => {
              this.entityObject = approvalCategory;
            });
          } else {
            this.currentCategory = this.db.object('/categories/' + params.key);

            // check to see if any approvals are awaiting on this category
            this.db.list('/approvals/categories', ref => ref.orderByChild('entityKey').equalTo(params.key)).snapshotChanges()
              .subscribe((approval:any) => {
                if (approval.length > 0 && approval[0]) {
                  this.awaitingApproval = approval[0].key;
                }
            });
          }

          this.currentCategory.subscribe(c => {
            this.newName = c.name;
            this.newWeight = c.weight;
            if (c.products) {
              this.newProducts = c.products;
            }
          });
        } else {
          this.newName = null;
          this.newWeight = 0;
        }
    });
  }

  addCategory(newName: string, newWeight: number) {
    if (newName) {
      let categoryObject = {
        name: newName,
        weight: newWeight,
        slug: this.globalService.slugify(newName),
        dateUpdated: Date.now().toString(),
        rdateUpdated: (Date.now() * -1).toString(),
        updatedBy: this.currentAdmin.uid,
        entityKey: this.editMode && this.categoryKey ? this.categoryKey : null,
        products: this.newProducts ? this.newProducts : null
      };

      if (this.editMode && this.categoryKey) {
        this.db.object('/categories/' + this.categoryKey).update(categoryObject);
      } else {
        this.categories.push(categoryObject).then((item) => {
          this.db.object('/categories/' + item.key + '/entityKey').set(item.key);
        });
      }

      let snackBarRef = this.snackBar.open('Category saved', 'OK!', {
        duration: 3000
      });

    }
    this.validateFields(newName);
  }

  submitForModeration(newName: string, newWeight: number) {
    if (newName && this.currentAdmin.uid) {

      let approvalObject = {
        entityKey: this.router.url.includes('approval') ? this.entityObject.entityKey : this.categoryKey,
        name: newName,
        weight: newWeight,
        slug: this.globalService.slugify(newName),
        dateUpdated: Date.now().toString(),
        rdateUpdated: (Date.now() * -1).toString(),
        updatedBy: this.currentAdmin.uid,
        products: this.newProducts ? this.newProducts : null
      };

      if (this.editMode && this.categoryKey) {
        this.currentModeratedCategories = this.db.list('/approvals/categories/');

        let adminApprovalCategories = this.db.list('/approvals/categories/', ref => ref.orderByChild('updatedBy').equalTo(this.currentAdmin.uid)).valueChanges();

        adminApprovalCategories.pipe(take(1)).subscribe((approvals:any) => {
          let matchingApprovals = [];
          if (this.router.url.includes('approval')) {
            matchingApprovals = approvals.filter((match) => {
              return match.entityKey === this.entityObject.entityKey;
            });
          } else {
            matchingApprovals = approvals.filter((match) => {
              return match.entityKey === this.categoryKey;
            });
          }

          if (matchingApprovals.length === 0 || !this.router.url.includes('approval')) {
            this.currentModeratedCategories.push(approvalObject);
          } else {
            this.db.object('/approvals/categories/' + this.categoryKey).update(approvalObject);
          }
        });
      } else {
          this.db.list('/approvals/categories/').push(approvalObject);
      }
      let snackBarRef = this.snackBar.open('Category submitted for moderation', 'OK!', {
        duration: 3000
      });
      snackBarRef.onAction().subscribe(() => {
        this.router.navigateByUrl('admin/approvals');
      });
    }

    this.validateFields(newName);
  }

  approveItem(newName: string, newWeight: number) {
    if (this.entityObject.entityKey) {
      let ogEntity = this.db.object('/categories/' + this.entityObject.entityKey);
      ogEntity.update(this.entityObject);
    } else {
      this.db.list('/categories').push(this.entityObject);
    }

    this.db.object('/approvals/categories/' + this.categoryKey).remove();
    let snackBarRef = this.snackBar.open('Category approved', 'OK!', {
      duration: 3000
    });
    this.router.navigateByUrl('admin/product-categories');
  }

  deleteItem(event) {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/approvals/categories/' + this.categoryKey).remove();
        let snackBarRef = this.snackBar.open('Draft deleted', 'OK!', {
          duration: 3000
        });
        this.router.navigateByUrl('admin/product-categories')
      }
    });
  }

  validateFields(name: string) {
    if (!name) {
      let snackBarRef = this.snackBar.open('You must add a name for this category', 'OK!', {
        duration: 3000
      });
    }
  }
}

