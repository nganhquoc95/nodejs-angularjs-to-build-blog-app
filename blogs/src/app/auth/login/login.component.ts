import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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

	objData: any;

	@Output() onLogin: EventEmitter<any> = new EventEmitter<any>();

	constructor(
		private authService: AuthService,
		private router: Router) {
		if(localStorage.getItem('currentUser') != "undefined"){
			this.isLoggedIn = true;
		}

		this.objData = {
			title: "Tieu De",
			slogan: "Slogan"
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
					this.emit(JSON.stringify(this.objData));
				}
			}
		});
	}

	logout(){
		this.status = "";
		this.message = "";
		this.emit(null);
		localStorage.removeItem('currentPageUser');
		this.authService.logout();
		this.isLoggedIn = false;
		this.router.navigate(['/']);
	}

	onRegister(event){
		this.isLoggedIn = event;
	}

	emit(val) {
		this.authService.emitConfig(val);
    }
}
