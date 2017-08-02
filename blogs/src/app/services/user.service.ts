import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { User } from '../models/user';

@Injectable()
export class UserService {

  	apiUrl = 'http://localhost:8000/user/';

  	public configObservable = new Subject<string>();

	constructor(private http:Http) { }

	emitConfig(val) {
	    this.configObservable.next(val);
	}

	create(user: Object) {
		let headers = new Headers({ 'Register': true });
  		let requestOptions = new RequestOptions({ headers: headers, withCredentials: true });
		return this.http.post(this.apiUrl + "create", user, requestOptions)
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	getFirst() {
		let headers = new Headers({ 'Guest': true });
	  	let requestOptions = new RequestOptions({ headers: headers, withCredentials: true });
		return this.http.get(this.apiUrl + 'guest', requestOptions)
		.map(response => response.json());
	}

	getById(id: string) {
		let headers = new Headers({ 'Userid': id });
	  	let requestOptions = new RequestOptions({ headers: headers, withCredentials: true });
		return this.http.get(this.apiUrl + 'get', requestOptions)
		.map(response => response.json());
	}

	getByPage(page: string) {
		let headers = new Headers({ 'Userpage': page });
	  	let requestOptions = new RequestOptions({ headers: headers, withCredentials: true });
		return this.http.get(this.apiUrl + 'user-page', requestOptions)
		.map(response => response.json());
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

	forgotPassword(email: Object){
		return this.http.get("http://localhost:8000/mailer?email=" + email)
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
		if(tmpUser != "undefined" && tmpUser != null){
			let user = JSON.parse(tmpUser);
			let headers = new Headers({ 'Authorization': user._id + ":" + user.password });
	  		return new RequestOptions({ headers: headers, withCredentials: true });
		}
	}
}
