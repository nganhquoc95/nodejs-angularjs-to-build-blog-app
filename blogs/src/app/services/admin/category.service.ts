import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Category } from '../../models/category';

@Injectable()
export class AdminCategoryService {

  apiUrl = 'http://localhost:8000/admin/categories/';
	constructor(private http:Http) { }

	getCategories(): Observable<Category[]> {
		return this.http.get(this.apiUrl, this._options())
		.map(response => response.json().categories);
	}

	getCategory(id: string) {
		return this.http.get(this.apiUrl + id, this._options())
		.map(response => response.json().category);
	}

	addCategory(category: Object){
		return this.http.post(this.apiUrl, category, this._options())
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	updateCategory(category: Object){
		return this.http.put(this.apiUrl + category["_id"], category, this._options())
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	deleteCategory(id: string){
		return this.http.delete(this.apiUrl + id, this._options())
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
