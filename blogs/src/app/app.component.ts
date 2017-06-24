import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Category } from './models/category';
import { CategoryService } from './services/category.service';

import { AuthService } from './services/auth.service';
import { Article } from './models/article';
import { ArticleService } from './services/article.service';

import { Observable } from 'rxjs/Observable';

import { RegisterComponent } from './auth/register/register.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	status: string;
	message: string;

	isLoggedIn = false;

	categories: Observable<Category[]>;

	articlesNew: Observable<Article[]>;

	@Output() selectedArticleEvent: EventEmitter<Article> = new EventEmitter<Article>();

	constructor(
		private authService: AuthService,
		private categoryService: CategoryService,
		private articleService: ArticleService, 
		private router: Router,
		private route: ActivatedRoute) {
		if(localStorage.getItem('currentUser')){
			this.isLoggedIn = true;
		}
	}

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

	login(authUser){
		this.authService.login(authUser)
		.subscribe( response => {
			if(response.status == "error"){
				this.status = response.status;
				this.message = response.message;
			}
			else{
				if(localStorage.getItem('currentUser')){
					this.isLoggedIn = true;
				}
			}
		});
	}

	logout(){
		this.authService.logout();
		this.isLoggedIn = false;
		this.router.navigate(['/']);
	}
}
