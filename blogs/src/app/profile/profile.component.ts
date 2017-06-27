import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
	})
export class ProfileComponent implements OnInit {
	status: string;
	message: string;

	user: User;
	constructor(private userService: UserService) {
		this.user = JSON.parse(localStorage.getItem('currentUser'));
	}

	ngOnInit() {
	}

	updateProfiles(info){
		info._id = this.user._id;
		this.userService.profiles(info).
		subscribe(res=>{
			this.status = res.status;
			this.message = res.message;
			if(res.user){
				this.user = res.user;
				localStorage.setItem('currentUser', JSON.stringify(this.user));
			}
		});
	}
}
