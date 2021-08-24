import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { PageComponent } from './components/page/page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  <Route>{
    path: '', component: MainComponent,
    children: [
      <Route>{ path: 'blog/:url', component: PostComponent },
      <Route>{ path: 'blog', component: PostsComponent },
      <Route>{ path: 'page-not-found', component: PageNotFoundComponent },
      <Route>{ path: '', component: PageComponent },
      <Route>{ path: ':url', component: PageComponent },

    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
