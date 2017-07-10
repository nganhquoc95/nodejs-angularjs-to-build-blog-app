import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Article } from '../models/article';
import { ArticleService } from './article.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArticleCategoryResolverService implements Resolve<any> {

  constructor(private articleService: ArticleService) { }

	resolve(route: ActivatedRouteSnapshot): Observable<any> {
		let id = route.params['id'];
		let page = route.params['page'];

		return this.articleService.getArticlesCategories(page, id).map(
			pages => {
				if (pages) {
					return pages;
				} else { 
					return null;
				}
			}
		);
	}
}
