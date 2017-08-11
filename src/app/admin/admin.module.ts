import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialComponentsModule } from 'app/materialcomponents.module';
import { SharedModule } from 'app/shared.module';

import { CKEditorModule } from 'ng2-ckeditor';
import { DndModule } from 'ng2-dnd';

import { AddAdminComponent } from 'app/admin-components/add-admin/add-admin.component';
import { AddCustomerComponent } from 'app/admin-components/add-customer/add-customer.component';
import { AddOrderComponent } from 'app/admin-components/add-order/add-order.component';
import { AddPageComponent } from 'app/admin-components/add-page/add-page.component';
import { AddPostComponent } from 'app/admin-components/add-post/add-post.component';
import { AddProductComponent } from 'app/admin-components/add-product/add-product.component';
import { AdminAdminsComponent } from 'app/admin-components/admin-admins/admin-admins.component';
import { AdminComponent } from 'app/admin-components/admin/admin.component';
import { AdminCustomersComponent } from 'app/admin-components/admin-customers/admin-customers.component';
import { AdminDashboardComponent } from 'app/admin-components/admin-dashboard/admin-dashboard.component';
import { AdminMenusComponent } from 'app/admin-components/admin-menus/admin-menus.component';
import { AdminOrdersComponent } from 'app/admin-components/admin-orders/admin-orders.component';
import { AdminPagesComponent } from 'app/admin-components/admin-pages/admin-pages.component';
import { AdminPostsComponent } from 'app/admin-components/admin-posts/admin-posts.component';
import { AdminProductsComponent } from 'app/admin-components/admin-products/admin-products.component';
import { AdminThemeComponent } from 'app/admin-components/admin-theme/admin-theme.component';
import { OrdersComponent } from 'app/storefront-components/orders/orders.component';

import { AuthGuard } from 'app/services/auth.guard';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MaterialComponentsModule,
    SharedModule,
    CKEditorModule,
    DndModule.forRoot(),
  ],
  declarations: [
    AddAdminComponent,
    AddCustomerComponent,
    AddOrderComponent,
    AddPageComponent,
    AddPostComponent,
    AddProductComponent,
    AdminAdminsComponent,
    AdminComponent,
    AdminCustomersComponent,
    AdminDashboardComponent,
    AdminMenusComponent,
    AdminOrdersComponent,
    AdminPagesComponent,
    AdminPostsComponent,
    AdminProductsComponent,
    AdminThemeComponent,
  ],
  providers: [AuthGuard]
})
export class AdminModule { }
