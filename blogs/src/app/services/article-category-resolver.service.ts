import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Article } from '../models/article';
import { ArticleService } from './article.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArticleCategoryResolverService implements Resolve<Article[]> {

  constructor(private articleService: ArticleService,private router: Router) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[]> {
		let id = route.params['id'];

		return this.articleService.getArticlesCategories(id).map(
			ariticles => {
				if (ariticles) {
					return ariticles;
				} else { // id not found
					this.router.navigate(['/bai-viet']);
					return null;
				}
			}
		);
	}
}
