import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ArticleService } from '../../services/article.service';

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
		private router: Router) {
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
					this.isLoggedIn = true;
					this.articleService.emitConfig(true);
					this.emit(localStorage.getItem('currentUser'));
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
