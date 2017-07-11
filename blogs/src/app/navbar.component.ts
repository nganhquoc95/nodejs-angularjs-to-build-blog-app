import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from './models/category';
import { User } from './models/user';
import { CategoryService } from './services/category.service';
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
		private categoryService: CategoryService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private userService: UserService,
		@Inject(Window) private window: Window) {
			let tempUser = localStorage.getItem('currentUser');
			if(tempUser != "undefined" && tempUser != null){
				this.user = JSON.parse(tempUser);
				this.objData = {
					title: this.user.page_title,
					slogan: this.user.page_slogan
				};
			}
			else{
				this.userService.getById('4')
					.subscribe( res => {
						this.objData = {
				        	title: res.user.page_title,
				        	slogan: res.user.page_slogan
				        }
					});
			}

			this.homePage = "";
			this.userService.configObservable.subscribe( res => {
				if(res == null){
					this.objData = null;
				} else{
					let tmp = JSON.parse(res);
			        this.objData = {
			        	title: tmp.page_title,
			        	slogan: tmp.page_slogan
			        }
				}
		    });
	}

	ngOnInit() {
		let arrUrl = ['lien-he','ve-chung-toi'];

		if(arrUrl.indexOf(this.window.location.pathname.split('/')[1])==-1){
			this.page = this.window.location.pathname.split('/')[1] || 'NguyenAnhQuoc';
		} else{
			if(this.user){
				this.page = this.user.page;
			} else{
				this.page = 'NguyenAnhQuoc';
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
