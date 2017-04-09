import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Article } from '../models/article';
import { ArticleService } from './article.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ArticleResolverService  implements Resolve<Article> {

	constructor(private articleService: ArticleService,private router: Router) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> {
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
