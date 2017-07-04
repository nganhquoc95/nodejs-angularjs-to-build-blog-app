import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Article } from '../../models/article';
import { AdminArticleService } from './article.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AdminArticleResolverService  implements Resolve<Article> {

	constructor(private articleService: AdminArticleService, private router: Router) { }

	resolve(route: ActivatedRouteSnapshot): Observable<Article> {
		let id = route.params['id'];

		return this.articleService.getArticle(id).map(
			ariticle => {
				if (ariticle) {
					return ariticle;
				} else { // id not found
					this.router.navigate(['/bai-viet']);
					return null;
				}
			}
		);
	}
}
