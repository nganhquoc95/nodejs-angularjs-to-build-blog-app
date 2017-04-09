import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";

import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { CategoryComponent } from './articles/category/category.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';

import { ArticleResolverService } from './services/article-resolver.service';
import { ArticleCategoryResolverService } from './services/article-category-resolver.service';

import { adminRoutes } from './admin/admin.routes';

const appRoutes: Routes = [
  { path: '', redirectTo:'/bai-viet', pathMatch: 'full'},
  { path: 'bai-viet', component: ArticlesComponent},
  { path: 'bai-viet/:id', component: ArticleDetailComponent, resolve: { article: ArticleResolverService }},
  { path: 'danh-muc/:id', component: CategoryComponent, resolve: {articles: ArticleCategoryResolverService}},
  { path: 'lien-he', component: ContactComponent},
  { path: 've-chung-toi', component: AboutComponent},
  { path: 'admin', component: AdminComponent, children: adminRoutes}
];

export const routes:ModuleWithProviders = RouterModule.forRoot(appRoutes);