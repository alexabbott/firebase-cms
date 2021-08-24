import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PublicComponent } from './public.component';

const routes: Routes = [
  <Route>{
    path: '', component: PublicComponent,
    children: [
      <Route>{ path: 'login', component: LoginComponent },
      <Route>{ path: 'register', component: LoginComponent },
      <Route>{ path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
