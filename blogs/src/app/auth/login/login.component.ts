import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	status: string;
	message: string;

	isLoggedIn: boolean = false;

	constructor(
		private authService: AuthService,
		private router: Router) {
		if(localStorage.getItem('currentUser')){
			this.isLoggedIn = true;
		}
	}

	ngOnInit() {
		// if(localStorage.getItem('currentUser')){
		// 	localStorage.removeItem('currentUser')
		// }
	}

	login(authUser){
		// localStorage.setItem('currentUser',JSON.stringify({_id: 5,name: "Anh QUoc", password: "123123123", role:"admin"}));

		// if(localStorage.getItem('currentUser')){
		// 	this.isLoggedIn = true;
		// }
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
		this.status = "";
		this.message = "";
		this.authService.logout();
		this.isLoggedIn = false;
		this.router.navigate(['/']);
	}

	onRegister(event){
		this.isLoggedIn = event;
	}
}
