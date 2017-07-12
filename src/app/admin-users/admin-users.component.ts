import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase) {
    this.users = db.list('/users');
  }

  deleteUser(key: string) {
    this.db.object('/users' + key).remove();
  }

  ngOnInit() {
  }

}
