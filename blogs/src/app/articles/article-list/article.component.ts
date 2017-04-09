import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/article';

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styles: []
})

export class ArticleComponent implements OnInit {
	@Input() article: Article;

	constructor() { }

	ngOnInit() {

	}

	srcImage(article){
		if(article != undefined)
			return "/assets/images/"+article.image;
		return null;
	}
}
