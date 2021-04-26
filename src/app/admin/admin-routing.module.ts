import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin-components/admin/admin.component';
import { AddPostComponent } from './admin-components/add-post/add-post.component';
import { AdminPostsComponent } from './admin-components/admin-posts/admin-posts.component';
import { AdminAdminsComponent } from './admin-components/admin-admins/admin-admins.component';
import { AdminDashboardComponent } from './admin-components/admin-dashboard/admin-dashboard.component';
import { AddAdminComponent } from './admin-components/add-admin/add-admin.component';
import { AdminPagesComponent } from './admin-components/admin-pages/admin-pages.component';
import { AddPageComponent } from './admin-components/add-page/add-page.component';
import { AdminMenusComponent } from './admin-components/admin-menus/admin-menus.component';
import { AdminThemeComponent } from './admin-components/admin-theme/admin-theme.component';
import { AdminProductsComponent } from './admin-components/admin-products/admin-products.component';
import { AddProductComponent } from './admin-components/add-product/add-product.component';
import { DeleteDialogComponent } from './admin-components/delete-dialog/delete-dialog.component';
import { AdminCustomersComponent } from './admin-components/admin-customers/admin-customers.component';
import { AddOrderComponent } from './admin-components/add-order/add-order.component';
import { AddCustomerComponent } from './admin-components/add-customer/add-customer.component';
import { AdminOrdersComponent } from './admin-components/admin-orders/admin-orders.component';
import { AdminProductCategoriesComponent } from './admin-components/admin-product-categories/admin-product-categories.component';
import { AddProductCategoryComponent } from './admin-components/add-product-category/add-product-category.component';
import { AdminApprovalsComponent } from './admin-components/admin-approvals/admin-approvals.component';
import { ApproveDialogComponent } from './admin-components/approve-dialog/approve-dialog.component';
import { OrderComponent } from '../storefront-components/order/order.component';

import { AuthGuard } from '../services/auth.guard';
import { SuperAdminGuard } from '../services/super-admin.guard';
import { AdminGuard } from '../services/admin.guard';

const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'add-customer', component: AddCustomerComponent, canActivate: [AdminGuard] },
          { path: 'add-order', component: AddOrderComponent, canActivate: [AdminGuard] },
          { path: 'add-page', component: AddPageComponent },
          { path: 'add-post', component: AddPostComponent },
          { path: 'add-product', component: AddProductComponent },
          { path: 'add-product-category', component: AddProductCategoryComponent },
          { path: 'add-admin', component: AddAdminComponent, canActivate: [SuperAdminGuard] },
          { path: 'approvals', component: AdminApprovalsComponent },
          { path: 'category-approval/:key', component: AddProductCategoryComponent },
          { path: 'page-approval/:key', component: AddPageComponent },
          { path: 'product-approval/:key', component: AddProductComponent },
          { path: 'post-approval/:key', component: AddPostComponent },
          { path: 'product-categories', component: AdminProductCategoriesComponent },
          { path: 'customer/:key', component: AdminOrdersComponent, canActivate: [AdminGuard] },
          { path: 'customers', component: AdminCustomersComponent, canActivate: [AdminGuard] },
          { path: 'edit-admin/:key', component: AddAdminComponent, canActivate: [SuperAdminGuard] },
          { path: 'edit-customer/:uid', component: AddCustomerComponent, canActivate: [AdminGuard] },
          { path: 'edit-order/:key', component: AddOrderComponent, canActivate: [AdminGuard] },
          { path: 'edit-page/:key', component: AddPageComponent },
          { path: 'edit-post/:key', component: AddPostComponent },
          { path: 'edit-product/:key', component: AddProductComponent },
          { path: 'edit-product-category/:key', component: AddProductCategoryComponent },
          { path: 'menus', component: AdminMenusComponent, canActivate: [AdminGuard] },
          { path: 'orders', component: AdminOrdersComponent, canActivate: [AdminGuard] },
          { path: 'order/:key', component: OrderComponent, canActivate: [AdminGuard] },
          { path: 'pages', component: AdminPagesComponent },
          { path: 'posts', component: AdminPostsComponent },
          { path: 'products', component: AdminProductsComponent },
          { path: 'theme', component: AdminThemeComponent, canActivate: [AdminGuard] },
          { path: 'admins', component: AdminAdminsComponent, canActivate: [SuperAdminGuard] },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
