import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  <Route>{
    path: '', component: AppComponent,
    children: [
      { path: 'store', loadChildren: () => import('./store/store.module').then(m => m.StoreModule) },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) }

    ]
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
