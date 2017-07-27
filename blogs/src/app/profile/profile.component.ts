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

	date: string;

	constructor(private userService: UserService, private router: Router) {
		this.user = JSON.parse(localStorage.getItem('currentUser'));
		this.isChangePassword = false;
		this.isChangeUrl = false;
		this.isSettingPage = false;
		this.date = this.format_date('dmy',this.user.born);
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
		info.born = this._date('ymd', this.date);
		console.log(info.born);
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

	change_date(date){
		this.date = date;
	}

	_date(format, date){
		if(date!=null){
			let dates = date.split('-');
			let d = new Date(dates[2], dates[1]-1, dates[0]);
			return d;
		}
		else
			return date;
	}

	format_date(format, date){
		if(date!=null){
			let d = new Date(date);
			let day = d.getDate() < 10 ? ("0"+d.getDate()) : d.getDate();
			let month = (d.getMonth() + 1) < 10 ? ("0" + (d.getMonth() + 1)) : d.getMonth();
			let year = d.getFullYear();

			if(format=="dmy"){
				return day + '-' + month + '-' + year;
			}
			else if(format=="ymd"){
				return year + '-' + month + '-' + day;
			}
		}
		else
			return date;
	}
}
