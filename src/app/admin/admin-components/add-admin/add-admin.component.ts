import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { MatSnackBar } from '@angular/material';
import { GlobalService } from 'app/services/global.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {

  newEmail: string;
  newRole: string;
  currentAdmin: Observable<any>;
  editMode: boolean;
  adminKey: string;

  constructor(
    public db: AngularFireDatabase,
    public snackBar: MatSnackBar,
    public router: Router,
    public route: ActivatedRoute,
    public globalService: GlobalService
  ) {
    this.editMode = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.key) {
          this.editMode = true;
          this.adminKey = params.key;
          this.currentAdmin = this.db.object('/admins/' + params.key).valueChanges();

          this.currentAdmin.subscribe((a:any) => {
            this.newEmail = a.email;
            this.newRole = a.role;
          });
        } else {
          this.newEmail = null;
          this.newRole = 'editor';
        }
    });
  }

  addAdmin(newEmail: string, newRole: string) {
    if (newEmail && newRole) {

      this.db.object('/admins/' + this.globalService.hashCode(newEmail)).update({
        email: newEmail,
        role: newRole
      });

      this.newEmail = null;
      this.newRole = null;

      let snackBarRef = this.snackBar.open('Admin saved', 'OK!', {
        duration: 3000
      });

    } else if (!newEmail) {
      let snackBarRef = this.snackBar.open('You must add an email for the user', 'OK!', {
        duration: 3000
      });
    } else if (!newRole) {
      let snackBarRef = this.snackBar.open('You must add a role for the user', 'OK!', {
        duration: 3000
      });
    }
  }
}
