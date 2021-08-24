import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../../materialcomponents.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { PageComponent } from './components/page/page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';


@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    MaterialComponentsModule,
    SharedModule,
  ],
  declarations: [
    MainComponent,
    PageComponent,
    PageNotFoundComponent,
    PostComponent,
    PostsComponent,
    CartIconComponent
  ],
})
export class MainModule { }
