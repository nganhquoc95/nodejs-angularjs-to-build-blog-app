import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SelectModule } from 'ng-select';

import { CKEditorModule } from 'ng2-ckeditor';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { ArticleComponent } from './articles/article-list/article.component';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ArticleService } from './services/article.service';
import { ArticleResolverService } from './services/article-resolver.service';
import { CategoryService } from './services/category.service';
import { ArticleCategoryResolverService } from './services/article-category-resolver.service';

import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CategoryComponent } from './articles/category/category.component';
import { routes } from './app.routes';

import { AdminComponent } from './admin/admin.component';
import { AdminArticleListComponent } from './admin/admin-article-list/admin-article-list.component';
import { DashboardComponent } from './admin/dashboard.component';
import { AdminArticleCreateComponent } from './admin/admin-article-create/admin-article-create.component';
import { AdminArticleEditComponent } from './admin/admin-article-edit/admin-article-edit.component';
import { AdminArticleDeleteComponent } from './admin/admin-article-delete/admin-article-delete.component';

import { AdminCategoryListComponent } from './admin/admin-category-list/admin-category-list.component';
import { AdminCategoryEditComponent } from './admin/admin-category-edit/admin-category-edit.component';
import { AdminCategoryCreateComponent } from './admin/admin-category-create/admin-category-create.component';
import { AdminCategoryDeleteComponent } from './admin/admin-category-delete/admin-category-delete.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { AdminUserListComponent } from './admin/user/admin-user-list/admin-user-list.component';
import { AdminUserDeleteComponent } from './admin/user/admin-user-delete/admin-user-delete.component';
import { AdminUserUpdateComponent } from './admin/user/admin-user-update/admin-user-update.component';
import { AdminUserCreateComponent } from './admin/user/admin-user-create/admin-user-create.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ArticlesComponent,
    ArticleListComponent,
    ArticleComponent,
    ArticleDetailComponent,
    AboutComponent,
    ContactComponent,
    AdminComponent,
    AdminArticleListComponent,
    DashboardComponent,
    AdminArticleCreateComponent,
    AdminArticleEditComponent,
    AdminArticleDeleteComponent,
    AdminCategoryListComponent,
    AdminCategoryEditComponent,
    AdminCategoryCreateComponent,
    AdminCategoryDeleteComponent,
    CategoryComponent,
    LoginComponent,
    RegisterComponent,
    AdminUserListComponent,
    AdminUserDeleteComponent,
    AdminUserUpdateComponent,
    AdminUserCreateComponent
  ],
  imports: [
    routes,
    BrowserModule,
    FormsModule,
    HttpModule,
    SelectModule,
    CKEditorModule
  ],
  providers: [
    AuthService,
    UserService,
    ArticleService,
    CategoryService,
    ArticleResolverService,
    ArticleCategoryResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
