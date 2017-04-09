import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-article-detail',
	templateUrl: './article-detail.component.html',
	styleUrls: ['./article-detail.component.css']
})

export class ArticleDetailComponent implements OnInit {

	selectedArticle: Article;

	constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService) { }

	ngOnInit() {
		this.activatedRoute.data.subscribe((data: {article: Article}) => {
			this.selectedArticle = data.article;
		});
	}
}
