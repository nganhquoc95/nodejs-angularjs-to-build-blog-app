import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

import { AdminArticleListComponent } from "./admin-article-list/admin-article-list.component";
import { AdminArticleCreateComponent } from './admin-article-create/admin-article-create.component';
import { AdminArticleEditComponent } from './admin-article-edit/admin-article-edit.component';
import { AdminArticleDeleteComponent } from './admin-article-delete/admin-article-delete.component';

import { AdminCategoryListComponent } from './admin-category-list/admin-category-list.component';
import { AdminCategoryCreateComponent } from './admin-category-create/admin-category-create.component';
import { AdminCategoryEditComponent } from './admin-category-edit/admin-category-edit.component';

import { AdminUserListComponent } from './user/admin-user-list/admin-user-list.component';
import { AdminUserCreateComponent } from './user/admin-user-create/admin-user-create.component';
import { AdminUserUpdateComponent } from './user/admin-user-update/admin-user-update.component';
import { AdminUserDeleteComponent } from './user/admin-user-delete/admin-user-delete.component';

export const adminRoutes: Routes = [
	{ path: '', component: DashboardComponent},
	{ path: 'articles', component: AdminArticleListComponent},
	{ path: 'article/create', component: AdminArticleCreateComponent},
	{ path: 'article/edit/:id', component: AdminArticleEditComponent},
	{ path: 'article/delete/:id', component: AdminArticleDeleteComponent},
	{ path: 'categories', component: AdminCategoryListComponent},
	{ path: 'category/create', component: AdminCategoryCreateComponent},
	{ path: 'category/edit/:id', component: AdminCategoryEditComponent},
	{ path: 'users', component: AdminUserListComponent},
	{ path: 'user/create', component: AdminUserCreateComponent},
	{ path: 'user/edit/:id', component: AdminUserUpdateComponent},
	{ path: 'user/delele/:id', component: AdminUserDeleteComponent}
];
