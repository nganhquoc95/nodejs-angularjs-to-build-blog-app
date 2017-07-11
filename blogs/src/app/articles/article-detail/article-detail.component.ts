import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-article-detail',
	templateUrl: './article-detail.component.html',
	styleUrls: ['./article-detail.component.css']
})

export class ArticleDetailComponent implements OnInit, OnDestroy {

	selectedArticle: Article;

	sub: any;

	page: string;

	constructor(
		private activatedRoute: ActivatedRoute, 
		private articleService: ArticleService,
		@Inject(Window) private window: Window) { }

	ngOnInit() {
		this.page = this.window.location.pathname.split('/')[1] || 'NguyenAnhQuoc';

		this.sub = this.activatedRoute.data.subscribe((data: {article: Article}) => {
			this.selectedArticle = data.article;
			// this.page = data['page'];
			console.log(this.page);
		});
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
	}
}
