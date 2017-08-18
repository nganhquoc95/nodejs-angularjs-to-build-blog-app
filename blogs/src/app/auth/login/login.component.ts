import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ArticleService } from '../../services/article.service';
import { CategoryService } from '../../services/category.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	status: string;
	message: string;

	isLoggedIn: boolean = false;

	objData: any;

	@Output() onLogin: EventEmitter<any> = new EventEmitter<any>();

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private articleService: ArticleService,
		private categoryService: CategoryService,
		private router: Router) {

		this.userService.configObservable.subscribe( res => {
			this.isLoggedIn = (res == localStorage.getItem('currentUser'));
		});

		if(localStorage.getItem('currentUser') != "undefined" && localStorage.getItem('currentUser') != null){
			this.isLoggedIn = true;
		}
	}

	ngOnInit() {
		// if(localStorage.getItem('currentUser')){
		// 	localStorage.removeItem('currentUser')
		// }
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
					let user = JSON.parse(localStorage.getItem('currentUser'));
					this.isLoggedIn = true;

					this.articleService.emitConfig(true);
					this.articleService.getArticleNew(user.page).subscribe(res=>{
						this.articleService.emitArticleNew(JSON.stringify(res));
					});

					this.categoryService.getCategories(user.page).subscribe(res=>{
						this.categoryService.emitCategories(JSON.stringify(res));
					});
					this.emit(localStorage.getItem('currentUser'));

					this.router.navigate(['/']);
				}
			}
		});
	}

	logout(){
		this.status = "";
		this.message = "";
		this.emit(null);
		this.articleService.emitConfig(false);
		this.authService.logout();
		this.isLoggedIn = false;
		this.router.navigate(['/']);
	}

	onRegister(event){
		this.isLoggedIn = event;
	}

	emit(val) {
		this.userService.emitConfig(val);
    }
}
