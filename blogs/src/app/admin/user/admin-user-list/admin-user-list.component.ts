import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { AdminUserService } from '../../../services/admin/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-admin-user-list',
	templateUrl: './admin-user-list.component.html',
	styleUrls: ['./admin-user-list.component.css']
	})
export class AdminUserListComponent implements OnInit {

	user: User;
	users: Observable<User[]>;

	constructor(private router: Router, private userService: AdminUserService) {
		this.user = JSON.parse(localStorage.getItem('currentUser'));
		if(!localStorage.getItem('currentUser') || this.user.role!="admin"){
			this.router.navigate(['/admin/']);
		}
	}

	ngOnInit() {
		this.users = this.userService.getAll();
	}

}
