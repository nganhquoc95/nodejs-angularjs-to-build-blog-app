import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-article-list',
	templateUrl: './article-list.component.html',
	styles: []
})
export class ArticleListComponent implements OnInit {

	articles: Observable<Article[]>;

	selectedArticle: Article;

	@Output() selectedEvent: EventEmitter<Article> = new EventEmitter<Article>();

	constructor(private articleService: ArticleService) { }

	ngOnInit() {
		this.articles = this.articleService.getArticles();
	}

	onSelect(article: Article){
		console.log(article);
		this.selectedEvent.emit(article);
	}
}
