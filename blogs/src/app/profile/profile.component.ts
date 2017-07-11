import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

	isChangePassword: boolean;

	isChangeUrl: boolean;

	isSettingPage: boolean;

	constructor(private userService: UserService, private router: Router) {
		this.user = JSON.parse(localStorage.getItem('currentUser'));
		this.isChangePassword = false;
		this.isChangeUrl = false;
		this.isSettingPage = false;
	}

	ngOnInit() {
	}

	updateCurrentLoggined(info){
		this.updateProfiles(info);

		if(this.isChangePassword)
			this.changePassword(info);
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

	changePassword(info){
		info._id = this.user._id;
		this.userService.changePassword(info).
		subscribe(res=>{
			this.status = res.status;
			this.message = res.message;
			this.isChangePassword = false;
			if(res.user){
				this.user = res.user;
				localStorage.setItem('currentUser', JSON.stringify(this.user));
			}
		});
	}

	onClickEditUrl(){
		this.isChangeUrl = !this.isChangeUrl;
	}

	onEditDoneUrl(){
		this.userService.changeUrl(this.user)
			.subscribe( res => {
				this.status = res.status;
				this.message = res.message;
				if(res.user){
					this.user = res.user;
					localStorage.setItem('currentUser', JSON.stringify(this.user));
				}
			});
		this.onClickEditUrl();
	}

	onSettingPageEdit(){
		this.isSettingPage = !this.isSettingPage;
	}

	onSettingPageDone(){
		this.userService.settingBlog(this.user)
			.subscribe( res => {
				this.status = res.status;
				this.message = res.message;
				if(res.user){
					this.user = res.user;
					localStorage.setItem('currentUser', JSON.stringify(this.user));
					this.emit(JSON.stringify(this.user));
				}
			});
		this.onSettingPageEdit();
	}

	emit(val){
		this.userService.emitConfig(val);
	}
}
