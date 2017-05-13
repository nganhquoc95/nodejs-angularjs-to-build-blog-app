import { Routes } from "@angular/router";
import { AdminArticleListComponent } from "./admin-article-list/admin-article-list.component";
import { DashboardComponent } from "./dashboard.component";
import { AdminArticleCreateComponent } from './admin-article-create/admin-article-create.component';
import { AdminArticleEditComponent } from './admin-article-edit/admin-article-edit.component';
import { AdminArticleDeleteComponent } from './admin-article-delete/admin-article-delete.component';

import { AdminCategoryListComponent } from './admin-category-list/admin-category-list.component';
import { AdminCategoryCreateComponent } from './admin-category-create/admin-category-create.component';
import { AdminCategoryEditComponent } from './admin-category-edit/admin-category-edit.component';
import { AdminCategoryDeleteComponent } from './admin-category-delete/admin-category-delete.component';

export const adminRoutes: Routes = [
	{ path: '', component: DashboardComponent},
	{ path: 'articles', component: AdminArticleListComponent},
	{ path: 'article/create', component: AdminArticleCreateComponent},
	{ path: 'article/edit/:id', component: AdminArticleEditComponent},
	{ path: 'article/delete/:id', component: AdminArticleDeleteComponent},
	{ path: 'categories', component: AdminCategoryListComponent},
	{ path: 'category/create', component: AdminCategoryCreateComponent},
	{ path: 'category/edit/:id', component: AdminCategoryEditComponent},
	{ path: 'category/delete/:id', component: AdminCategoryDeleteComponent}
];
