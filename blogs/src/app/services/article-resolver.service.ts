import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Article } from '../models/article';
import { ArticleService } from './article.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ArticleResolverService implements Resolve<Article> {

	constructor(private articleService: ArticleService) { }

	resolve(route: ActivatedRouteSnapshot): Observable<Article> {
		let id = route.params['id'];
		let page = route.params['page'];

		return this.articleService.getArticle(page, id).map(
			ariticle => {
				if (ariticle) {
					return ariticle;
				} else { // id not found
					return null;
				}
			}
		);
	}
}
