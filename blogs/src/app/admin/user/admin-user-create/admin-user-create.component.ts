import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-admin-user-create',
	templateUrl: './admin-user-create.component.html',
	styleUrls: ['./admin-user-create.component.css']
	})
export class AdminUserCreateComponent implements OnInit {

	isBusy: boolean = false;
	error: any;
	sex: string;
	user: User;

	constructor(private router: Router, private userService: UserService) {
		this.sex = 'other';
		
		this.user = JSON.parse(localStorage.getItem('currentUser'));
		if(!localStorage.getItem('currentUser') || this.user.role!="admin"){
			this.router.navigate(['/admin/']);
		}
	}

	ngOnInit() {
	}

	createUser(user){
		if(!this.isBusy){
			console.log(user);
			this.isBusy = true;
			this.userService.create(user)
				.subscribe(user=>{
					this.isBusy = true;
					this.router.navigate(['/admin/users']);
				}, error => error = <any>error );
		}
	}
}
