import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Category } from '../models/category';

@Injectable()
export class CategoryService {

  apiUrl = 'http://localhost:8000/';
	constructor(private http:Http) { }

	getCategories(page: string) {
		return this.http.get(this.apiUrl + page + "/categories/", this._options())
		.map(response => response.json());
	}

	getCategory(page:string, id: string) {
		return this.http.get(this.apiUrl + page + "/categories/" + id, this._options())
		.map(response => response.json().category);
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
