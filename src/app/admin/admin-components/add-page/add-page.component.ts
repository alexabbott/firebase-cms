import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { GlobalService } from 'app/services/global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  pages: Observable<any>;
  newURL: string;
  newTitle: string;
  newBody: string;
  newPublished: boolean;
  currentAdmin: any;
  editMode: boolean;
  pageKey: string;
  selectedOption: string;
  currentModeratedPages: AngularFireList<any>;
  entityObject: any;
  currentPage: Observable<any>;
  awaitingApproval: string;

  constructor(
    public db: AngularFireDatabase,
    public snackBar: MdSnackBar,
    public globalService: GlobalService,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MdDialog
  ) {
    this.newPublished = false;
    this.pages = db.list('/pages').valueChanges();
    this.globalService.admin.subscribe(admin => {
      this.currentAdmin = admin;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.key) {
          this.editMode = true;
          this.pageKey = params.key;

          if (this.router.url.includes('approval')) {
            this.currentPage = this.db.object('/approvals/pages/' + params.key).valueChanges();
            this.db.object('/approvals/pages/' + this.pageKey).valueChanges().subscribe((approvalPage:any) => {
              this.entityObject = approvalPage;
            });
          } else {
            this.currentPage = this.db.object('/pages/' + params.key).valueChanges();

            // check to see if any approvals are awaiting on this page
            this.db.list('/approvals/pages', ref => ref.orderByChild('entityKey').equalTo(params.key)).snapshotChanges()
              .subscribe((approval:any) => {
                if (approval.length > 0 && approval[0]) {
                  this.awaitingApproval = approval[0].key;
                }
            });
          }

          this.currentPage.subscribe(p => {
            this.newURL = p.url;
            this.newTitle = p.title;
            this.newBody = p.body;
            this.newPublished = p.published;
          });
        } else {
          this.newURL = null;
          this.newTitle = null;
          this.newBody = null;
          this.newPublished = false;
        }
    });
  }

  addPage(newURL: string, newTitle: string, newBody: string, newPublished: boolean) {

    if (!newPublished) {
      newPublished = false;
    }

    if (newURL && newTitle && newBody && this.currentAdmin.uid) {

      let pageObject = {
        url: newURL,
        dateUpdated: Date.now(),
        rdateUpdated: (Date.now() * -1),
        title: newTitle,
        body: newBody,
        published: newPublished,
        updatedBy: this.currentAdmin.uid,
        entityKey: this.editMode && this.pageKey ? this.pageKey : null
      };

      if (this.editMode && this.pageKey) {
        this.db.object('/pages/' + this.pageKey).update(pageObject);
      } else {
        this.db.list('/pages').push(pageObject).then((item) => {
          this.db.object('/pages/' + item.key + '/entityKey').set(item.key);
        });
      }

      let snackBarRef = this.snackBar.open('Page saved', 'OK!', {
        duration: 3000
      });
    }

    this.validateFields(newURL, newTitle, newBody);
  }

  submitForModeration(newURL: string, newTitle: string, newBody: string, newPublished: boolean) {
    if (!newPublished) {
      newPublished = false;
    }

    if (newURL && newTitle && newBody && this.currentAdmin.uid) {

      let approvalObject = {
        entityKey: this.router.url.includes('approval') ? this.entityObject.entityKey : this.pageKey,
        url: newURL,
        dateUpdated: Date.now(),
        rdateUpdated: (Date.now() * -1),
        title: newTitle,
        body: newBody,
        published: newPublished,
        updatedBy: this.currentAdmin.uid
      };

      if (this.editMode && this.pageKey) {

        this.currentModeratedPages = this.db.list('/approvals/pages/');

        let adminApprovalPages = this.db.list('/approvals/pages/', ref => ref.orderByChild('updatedBy').equalTo(this.currentAdmin.uid));

        adminApprovalPages.valueChanges().take(1).subscribe((approvals:any) => {

          let matchingApprovals = [];
          if (this.router.url.includes('approval')) {
            matchingApprovals = approvals.filter((match) => {
              return match.$key === this.pageKey;
            });
          } else {
            matchingApprovals = approvals.filter((match) => {
              return match.entityKey === this.pageKey;
            });
          }

          if (matchingApprovals.length === 0) {
            this.currentModeratedPages.push(approvalObject);
          } else {
            this.db.object('/approvals/pages/' + this.pageKey).update(approvalObject);
          }
        });
      } else {
          this.db.list('/approvals/pages/').push(approvalObject);
      }
      let snackBarRef = this.snackBar.open('Page submitted for moderation', 'OK!', {
        duration: 3000
      });
      snackBarRef.onAction().subscribe(() => {
        this.router.navigateByUrl('admin/approvals');
      });
    }

    this.validateFields(newURL, newTitle, newBody);
  }

  approveItem(newURL: string, newTitle: string, newBody: true, newPublished: boolean) {
    if (this.entityObject.entityKey) {
      let ogEntity = this.db.object('/pages/' + this.entityObject.entityKey);
      ogEntity.set(this.entityObject);
    } else {
      this.db.list('/pages').push(this.entityObject);
    }

    this.db.object('/approvals/pages/' + this.entityObject.$key).remove();
    let snackBarRef = this.snackBar.open('Page approved', 'OK!', {
      duration: 3000
    });
    this.router.navigateByUrl('admin/pages');
  }

  deleteItem(event) {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/approvals/pages/' + this.pageKey).remove();
        let snackBarRef = this.snackBar.open('Draft deleted', 'OK!', {
          duration: 3000
        });
        this.router.navigateByUrl('admin/pages')
      }
    });
  }

  validateFields(url: string, title: string, body: string) {
    if (!url) {
      let snackBarRef = this.snackBar.open('You must add a URL for this page', 'OK!', {
        duration: 3000
      });
    } else if (!title) {
      let snackBarRef = this.snackBar.open('You must add a title for this page', 'OK!', {
        duration: 3000
      });
    } else if (!body) {
      let snackBarRef = this.snackBar.open('You must add content to the page', 'OK!', {
        duration: 3000
      });
    }
  }
}

