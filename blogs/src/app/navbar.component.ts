import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from './models/category';
import { User } from './models/user';
import { CategoryService } from './services/category.service';
import { ArticleService } from './services/article.service';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styles: []
})
export class NavbarComponent implements OnInit {

	user: User;

	page: string;

	homePage: string;

	categories: Category[];

	objData: any;

	@Output()
	selectedCategoryEvent: EventEmitter<Category[]> = new EventEmitter<Category[]>();

	constructor(
		private articleService: ArticleService,
		private categoryService: CategoryService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private userService: UserService,
		@Inject(Window) private window: Window) {

			this.homePage = "";
			this.articleService.categoryObservable.subscribe( res => {
				let objTmp = JSON.parse(res);
				this.categories = objTmp.categories;
			});

			// Thiết lập tiêu đề và slogan cho blog khi đăng nhập
			this.userService.configObservable.subscribe( res => {
				if(res == null){
					this.objData = null;
				} else{
					let tmp = JSON.parse(res);
			        this.objData = {
			        	title: tmp.page_title,
			        	slogan: tmp.page_slogan
			        }
			        this.page = tmp.page;
				}
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
			this.page = this.window.location.pathname.split('/')[1];
			this.userService.getByPage(this.page).subscribe(res=>{
				this.objData = {
					title: res.user.page_title,
				    slogan: res.user.page_slogan
				}
			});
		} else{
			if(this.user){
				this.page = this.user.page;
			} else{
				this.userService.getFirst().subscribe( res => {
					this.page = res.user.page;
				});
			}
		}

		this.categoryService.getCategories(this.page)
			.subscribe(res => {
				this.categories = res.categories;
			});

		if(this.user){
			this.homePage = this.user.page;
		}

		this.selectedCategoryEvent.emit(this.categories);
	}

	onClicked(id){
		this.router.navigate([this.page + '/danh-muc', id], { relativeTo: this.activatedRoute });
	}

	onClickHome(){
		if(this.user)
			this.page = this.user.page;

		this.categoryService.getCategories(this.page)
			.subscribe(res => {
				this.categories = res.categories;
			});
	}
}
