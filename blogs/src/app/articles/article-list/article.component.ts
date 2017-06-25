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

	srcImage(image){
		if(image != undefined && image != "")
			return "http://localhost:8000/uploads/"+image;
		return "/assets/images/image-not-found.png";
	}
}
