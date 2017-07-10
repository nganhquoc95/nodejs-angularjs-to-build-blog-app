import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';
import { User } from '../../models/user';
import { AdminUserService } from '../../services/admin/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
	})
export class RegisterComponent implements OnInit {

	status: string;
	message: string;

	constructor( private userService: AdminUserService, private router: Router ) { }

	ngOnInit() {
	}

	registerSubmit(user){
		this.userService.create(user)
		.subscribe( response => {
			this.status = response.status;
			this.message = response.message;

			if(this.status == "success"){
				localStorage.setItem('currentUser', JSON.stringify(response.user));
				this.router.navigate(['/']);
			}
		});
	}
}
