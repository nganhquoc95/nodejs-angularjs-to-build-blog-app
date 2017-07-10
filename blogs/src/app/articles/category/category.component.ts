import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article';
import { Category } from '../../models/category';
import { ArticleService } from '../../services/article.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy{

	articles: Article[];

	category: Category;

	page: string;

	id: string;

	sub: any;
	constructor(
		private activatedRoute: ActivatedRoute, 
		private articleService: ArticleService,
		@Inject(Window) private window: Window) { }

	ngOnInit() {
		this.page = this.window.location.pathname.split('/')[1] || 'NguyenAnhQuoc';
		this.sub = this.activatedRoute.data.subscribe(res => {
			res = res.res;
			this.articles = res.articles;
			this.category = res.category;
		});
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
	}

	srcImage(image){
		if(image != undefined && image != null && image != "")
			return "http://localhost:8000/uploads/"+image;
		return "/assets/images/image-not-found.png";
	}
}
