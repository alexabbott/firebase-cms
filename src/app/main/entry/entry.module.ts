import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { EntryRoutingModule } from './entry-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { EntryComponent } from './entry.component';
import { PageComponent } from './components/page/page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';


@NgModule({
  imports: [
    CommonModule,
    EntryRoutingModule,
    FormsModule,
    MaterialComponentsModule,
    SharedModule,
  ],
  declarations: [
    EntryComponent,
    PageComponent,
    PageNotFoundComponent,
    PostComponent,
    PostsComponent,
    SearchResultsComponent
  ]

})
export class EntryModule { }
