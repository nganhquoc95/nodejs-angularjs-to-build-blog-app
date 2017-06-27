import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-admin-user-update',
	templateUrl: './admin-user-update.component.html',
	styleUrls: ['./admin-user-update.component.css']
	})
export class AdminUserUpdateComponent implements OnInit {
	status: string;
	message: string;
	error: any;

	id: any;
	params: any;

	currentUser: User;

	@Input() user : User;

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if(!localStorage.getItem('currentUser') || this.currentUser.role!="admin"){
			this.router.navigate(['/admin/']);
		}
	}

	ngOnInit() {
		this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);

		this.userService.getById(this.id).subscribe(
			user=>{
				this.user = user;
			},error=>{this.error = error});
	}

	ngOnDestroy(){
		this.params.unsubscribe();
	}

	updateUser(user) {
		user._id  = this.user._id;
		this.userService.update(user)
		.subscribe(
			response=>{
				console.log(response);
				this.status = response["status"];
				this.message = response["message"];
			},
			error => {
				console.log(<any>error);
				this.status = error.status;
				this.message = error.message;
			});
	}
}
