import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';

@Injectable()
export class UserService {

  	apiUrl = 'http://localhost:8000/user/';
	constructor(private http:Http) { }

	getAll(): Observable<User[]> {
		return this.http.get(this.apiUrl)
		.map(response => response.json().users);
	}

	getById(id: string) {
		return this.http.get(this.apiUrl + id)
		.map(response => response.json().user);
	}

	create(user: Object) {
		return this.http.post(this.apiUrl + "create", user)
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	update(user: Object){
		console.log(user);
		return this.http.put(this.apiUrl + user["_id"] + "/update", user)
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	profiles(user: Object){
		console.log(user);
		return this.http.put(this.apiUrl + user["_id"] + "/profiles", user)
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	delete(id: string): Observable<User[]>{
		return this.http.delete(this.apiUrl + id + "/delete")
			.map(response => response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

}
