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

	sub2: any;

	num_page: any;
	constructor(
		private activatedRoute: ActivatedRoute, 
		private articleService: ArticleService,
		@Inject(Window) private window: Window) { }

	ngOnInit() {
		this.sub2 = this.activatedRoute.params.subscribe(params => {
	       this.num_page = +params['num_page'] || 0;
	    });

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

	paginate(){
		let prevPage = this.num_page - 1;
		let nextPage = this.num_page + 1;
		if(prevPage < 0){
			prevPage = 0;
		}

		let content = '<ul class="pagination">';
		content += "<li><a href='/" + this.page + "/danh-muc/" + this.category._id + "/page/" + prevPage + "' >Previous</a></li>";
		content += "<li><a href='/" + this.page + "/danh-muc/" + this.category._id + "/page/" + nextPage + "' >Next</a></li>";
		content += "</ul>";
		return content;
	}
}
