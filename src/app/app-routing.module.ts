import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/components/login/login.component';

const routes: Routes = [
  <Route>{
    path: '', component: AppComponent,
    children: [
      <Route>{ path: 'login', component: LoginComponent },
      <Route>{ path: 'register', component: LoginComponent },
      <Route>{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      <Route>{ path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule)}
    ]
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
