import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-theme',
  templateUrl: './admin-theme.component.html',
  styleUrls: ['./admin-theme.component.scss']
})
export class AdminThemeComponent implements OnInit {

  theme: FirebaseObjectObservable<any>;
  siteName: string;

  constructor(public db: AngularFireDatabase, public snackBar: MdSnackBar) {
    this.theme = db.object('/theme');
  }

  saveTheme(newSiteName: string) {
    this.theme.update({
      siteName: newSiteName
    });
  
    let snackBarRef = this.snackBar.open('Theme updated', 'OK!', {
      duration: 3000
    });
  }

  ngOnInit() {
    this.theme.subscribe(item => {
      if (item && item.siteName) {
        this.siteName = item.siteName;
      }
    });
  }

}
