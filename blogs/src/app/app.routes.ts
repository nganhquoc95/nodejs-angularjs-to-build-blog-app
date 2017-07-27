import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";

// import { NavbarComponent } from './navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { CategoryComponent } from './articles/category/category.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { IndexComponent } from './index/index.component';

import { CategoryResolverService } from './services/category-resolver.service';

import { ArticleResolverService } from './services/article-resolver.service';
import { ArticleCategoryResolverService } from './services/article-category-resolver.service';

import { adminRoutes } from './admin/admin.routes';

const appRoutes: Routes = [
  // { path: '', redirectTo:'/:page', pathMatch: 'full' },
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profiles', component: ProfileComponent },

  { path: 'admin', component: AdminComponent, children: adminRoutes },

  { path: ':page', component: ArticlesComponent, resolve: {categories: CategoryResolverService} },

  { path: ':page/danh-muc/:id', component: CategoryComponent, resolve: {res: ArticleCategoryResolverService} },
  { path: ':page/danh-muc/:id/pape/:num_page', component: CategoryComponent, resolve: {res: ArticleCategoryResolverService} },
  { path: ':page/lien-he', component: ContactComponent },
  { path: ':page/ve-chung-toi', component: AboutComponent },

  { path: ':page/bai-viet', component: ArticlesComponent, resolve: {categories: CategoryResolverService} },
  { path: ':page/bai-viet/:id', component: ArticleDetailComponent, resolve: { article: ArticleResolverService } }
];

export const routes:ModuleWithProviders = RouterModule.forRoot(appRoutes);