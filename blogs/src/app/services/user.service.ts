import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';

@Injectable()
export class UserService {

  	apiUrl = 'http://localhost:8000/user/';

	constructor(private http:Http) { }

	getById(id: string) {
		return this.http.get(this.apiUrl + id, this._options())
		.map(response => response.json().user);
	}

	profiles(user: Object){
		return this.http.put(this.apiUrl + user["_id"] + "/profiles", user, this._options())
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	changePassword(user: Object){
		return this.http.put(this.apiUrl + user["_id"] + "/change-password", user, this._options())
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	changeUrl(user: Object){
		return this.http.put(this.apiUrl + user["_id"] + "/url-page", user, this._options())
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	settingBlog(user: Object){
		return this.http.put(this.apiUrl + user["_id"] + "/setting-blog", user, this._options())
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	delete(id: string){
		return this.http.delete(this.apiUrl + id + "/delete", this._options())
			.map(response => response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	private _options(): RequestOptions{
		let tmpUser = localStorage.getItem('currentUser');
		if(tmpUser != "undefined"){
			let user = JSON.parse(tmpUser);
			let headers = new Headers({ 'Authorization': user._id + ":" + user.password });
	  		return new RequestOptions({ headers: headers, withCredentials: true });
		}
	}
}
