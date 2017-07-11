import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Article } from '../../models/article';

@Injectable()
export class AdminArticleService {

	apiUrl = 'http://localhost:8000/admin/articles/';
	apiCategoryUrl = this.apiUrl + 'category/';

	constructor(private http:Http) { }

	getArticles(): Observable<Article[]> {
		return this.http.get(this.apiUrl, this._options())
		.map(response => response.json().articles);
	}

	getArticle(id: string) {
		return this.http.get(this.apiUrl + id, this._options())
		.map(response => response.json().article);
	}

	getArticlesCategories(id: string): Observable<Article[]> {
		return this.http.get(this.apiCategoryUrl + id, this._options())
		.map(response => response.json().articles);
	}

	addArticle(article: Object): Observable<Article[]> {
		return this.http.post(this.apiUrl, article, this._options())
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error || {message: "Server Error"}));
	}

	updateArticle(id, article: Object){
		return this.http.put(this.apiUrl + id, article, this._options())
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error || {message: "Server Error"}));
	}

	upload(file: Object): Observable<Object> {
		return this.http.post(this.apiUrl + 'uploads', file, this._options())
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error || {message: "Server Error"}));
	}

	deleteArticle(id: string): Observable<Article[]>{
		return this.http.delete(this.apiUrl + id, this._options())
		.map(response => response.json())
		.catch((error:any) => Observable.throw(error || {message: "Server Error"}));
	}

	getArticleNew(){
		return this.http.get(this.apiUrl + "/new-articles", this._options())
		.map(response => response.json().articles);
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
