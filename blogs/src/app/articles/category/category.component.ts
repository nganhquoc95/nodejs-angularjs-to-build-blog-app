import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styles: []
})
export class CategoryComponent implements OnInit{

	articles: Article[];

	constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService) { }

	ngOnInit() {
		this.activatedRoute.data.subscribe((data: {articles:Article[]}) => {
			this.articles = data.articles;
		});
	}

	srcImage(image){
		if(image != undefined)
			return "http://localhost:8000/uploads/"+image;
		return "/assets/images/image-not-found.png";
	}
}
