import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
	})
export class RegisterComponent implements OnInit {

	isLoggedIn = false;
	status: string;
	message: string;

	@Output() emitLoggedIn:EventEmitter<any> = new EventEmitter();

	constructor( private userService: UserService, private router: Router ) { }

	ngOnInit() {
	}

	registerSubmit(user){
		this.userService.create(user)
		.subscribe( response => {
			this.status = response.status;
			this.message = response.message;

			if(this.status == "success"){
				this.emitLoggedIn.emit(this.isLoggedIn);
				localStorage.setItem('currentUser', JSON.stringify(response.user));
				this.router.navigate(['/']);
			}
		});
	}
}
