import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';

@Component({
	selector: 'app-articles',
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	selectedArticle: Article;

	selectArticle(article: Article){
		this.selectedArticle = article;
	}
}
