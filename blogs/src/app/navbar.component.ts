import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from './models/category';
import { User } from './models/user';
import { CategoryService } from './services/category.service';
import { AuthService } from './services/auth.service';
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
		private authService: AuthService,
		@Inject(Window) private window: Window) {
			let tempUser = localStorage.getItem('currentUser');
			if(tempUser != "undefined"){
				this.user = JSON.parse(tempUser);
			}
			this.homePage = "";

			this.authService.configObservable.subscribe( res => {
		        localStorage.setItem('currentPageUser', this.objData);
		        this.objData = JSON.parse(localStorage.getItem('currentPageUser'));
		    });
	}

	ngOnInit() {
		this.page = this.window.location.pathname.split('/')[1] || 'NguyenAnhQuoc';

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
