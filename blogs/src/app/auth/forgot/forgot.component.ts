import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
	status: string;
	message: string;

	constructor( private userService: UserService, private router: Router ) {
		if (localStorage.getItem("currentUser")){
			router.navigate(['/']);
		}
	}

	ngOnInit() {
	}

	forgotSubmit(data){
		this.userService.forgotPassword(data.email)
		.subscribe( response => {
			this.status = response.status;
			this.message = response.message;
		});
	}
}
