import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article';
import { User } from '../../models/user';
import { ArticleService } from '../../services/article.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-article-list',
	templateUrl: './article-list.component.html',
	styles: []
})
export class ArticleListComponent implements OnInit, OnDestroy {

	articles: Article[] = [];

	sub: any;

	selectedArticle: Article;

	page: string;

	@Output() selectedEvent: EventEmitter<Article> = new EventEmitter<Article>();

	constructor(private articleService: ArticleService,
		private activatedRoute: ActivatedRoute) {  }

	ngOnInit() {
		this.sub = this.activatedRoute.params.subscribe(params => this.page = params['page']);
		this.articleService.getArticles(this.page).subscribe(res=>{
			this.articles = res;
		});
	}

	ngOnDestroy() {
    	this.sub.unsubscribe();
  	}

	onSelect(article: Article){
		this.selectedEvent.emit(article);
	}
}
