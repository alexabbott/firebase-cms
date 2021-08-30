import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  <Route>{
    path: '', component: MainComponent,
    children: [
      <Route>{ path: 'store', loadChildren: () => import('./store/store.module').then(m => m.StoreModule) },
      <Route>{ path: '', loadChildren: () => import('./entry/entry.module').then(m => m.EntryModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
