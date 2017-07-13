import { Component, OnInit, Inject, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Category } from './models/category';
import { CategoryService } from './services/category.service';

import { Article } from './models/article';
import { ArticleService } from './services/article.service';

import { User } from './models/user';
import { UserService } from './services/user.service';

import { Observable } from 'rxjs/Observable';

import { RegisterComponent } from './auth/register/register.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	@Input()
	categories: Category[];

	articlesNew: Article[];

	user: User;

	page: string;

	@Output()
	selectedArticleEvent: EventEmitter<Article> = new EventEmitter<Article>();

	constructor(
		private categoryService: CategoryService,
		private articleService: ArticleService, 
		private userService: UserService,
		private router: Router,
		private route: ActivatedRoute,
		@Inject(Window) private window: Window) { 

			// Trang của user
			this.userService.configObservable.subscribe(res=>{
				this.user = JSON.parse(res);
				if(this.user!=null)
					this.page = this.user.page;
			});

			// 5 bài viết mới nhất
			this.articleService.articleNewObservable.subscribe(res=>{
				let tmpRes = JSON.parse(res);
				this.articlesNew = tmpRes.articles;
			});

			// thông tin danh mục của trang cá nhân
			this.categoryService.categoryObservable.subscribe(res=>{
				let tmpRes = JSON.parse(res);
				this.categories = tmpRes.categories;
			});
		}

	ngOnInit() {
		let arrUrl = ['lien-he','ve-chung-toi','register','admin','profiles'];

		let tmpPage = this.window.location.pathname.split('/')[1];
		
		if( tmpPage.trim()!="" && arrUrl.indexOf(tmpPage)==-1 ){
			this.page = tmpPage;
		} else{
			this.userService.getFirst().subscribe( res => {
				this.page = res.user.page;
			});
		}

		this.categoryService.getCategories(this.page)
			.subscribe( res => {
				this.categories = res.categories;
			});

		this.articleService.getArticleNew(this.page).subscribe(res=>{
			this.articlesNew = res.articles;
		});
	}

	onSelectArticle(article: Article){
		this.selectedArticleEvent.emit(article);
	}

	onClicked(category){
		this.router.navigate([this.page + '/danh-muc', category._id],{ relativeTo: this.route });
		this.scrollToTop(15);
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
