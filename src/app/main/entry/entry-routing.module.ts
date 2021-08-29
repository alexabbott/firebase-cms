import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { PageComponent } from './components/page/page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { EntryComponent } from './entry.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

const routes: Routes = [
  <Route>{
    path: '', component: EntryComponent,
    children: [
      <Route>{ path: 'blog/:url', component: PostComponent },
      <Route>{ path: 'blog', component: PostsComponent },
      <Route>{ path: 'page-not-found', component: PageNotFoundComponent },
      <Route>{ path: 'search', component: SearchResultsComponent },
      <Route>{ path: '', component: PageComponent },
      <Route>{ path: ':url', component: PageComponent },

    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule {}
