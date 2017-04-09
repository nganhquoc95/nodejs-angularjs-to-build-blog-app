import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Category } from './models/category';
import { CategoryService } from './services/category.service';

import { Article } from './models/article';
import { ArticleService } from './services/article.service';

import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	categories: Observable<Category[]>;

	articlesNew: Observable<Article[]>;

	@Output() selectedArticleEvent: EventEmitter<Article> = new EventEmitter<Article>();

	constructor(private categoryService: CategoryService,
		private articleService: ArticleService, 
		private router: Router,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.categories = this.categoryService.getCategories();

		this.articlesNew = this.articleService.getArticleNew();
	}

	onSelectArticle(article: Article){
		console.log(article);
		this.selectedArticleEvent.emit(article);
	}

	onClicked(category){
		this.router.navigate(['/danh-muc',category._id],{ relativeTo: this.route });
		this.scrollToTop(500);
	}

	scrollToTop(scrollDuration) {
	    var scrollStep = -window.scrollY / (scrollDuration / 15),
	        scrollInterval = setInterval(function(){
		        if ( window.scrollY != 0 ) {
		            window.scrollBy( 0, scrollStep );
		        }
		        else clearInterval(scrollInterval); 
		    },15);
	}
}
