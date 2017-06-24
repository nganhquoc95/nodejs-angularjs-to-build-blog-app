import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Category } from '../models/category';

@Injectable()
export class CategoryService {

  apiUrl = 'http://localhost:8000/categories/';
	constructor(private http:Http) { }

	getCategories(): Observable<Category[]> {
		return this.http.get(this.apiUrl)
		.map(response => response.json().categories);
	}

	getCategory(id: string) {
		return this.http.get(this.apiUrl + id)
		.map(response => response.json().category);
	}

	addCategory(category: Object): Observable<Category[]> {
		return this.http.post(this.apiUrl, category)
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	updateCategory(category: Object): Observable<Category[]> {
		return this.http.put(this.apiUrl + category["_id"], category)
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	deleteCategory(id: string): Observable<Category[]>{
		return this.http.delete(this.apiUrl + id)
		.map(response => response.json())
		.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

}
