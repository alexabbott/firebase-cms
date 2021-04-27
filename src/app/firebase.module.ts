import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import * as firebase from 'firebase';
import { environment } from './../environments/environment';

firebase.default.initializeApp(environment.firebase);

@NgModule({
    imports: [
        AngularFireModule.initializeApp(environment.firebase, 'firebase-cms'),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireAuthGuardModule
    ],
    exports: [
        AngularFireModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireAuthGuardModule
    ]
})
export class FirebaseModule { }
