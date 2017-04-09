import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-admin-article-list',
	templateUrl: './admin-article-list.component.html',
	styleUrls: ['./admin-article-list.component.css']
})
export class AdminArticleListComponent implements OnInit {

	articles: Observable<Article[]>;
	constructor(private articleService: ArticleService) { }

	ngOnInit() {
		this.articles = this.articleService.getArticles();
	}

}
