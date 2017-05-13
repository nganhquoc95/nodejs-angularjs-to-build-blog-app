import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Article } from '../models/article';

@Injectable()
export class ArticleService {

	apiUrl = 'http://localhost:8000/articles/';
	apiCategoryUrl = this.apiUrl + 'category/';

	constructor(private http:Http) { }

	getArticles(): Observable<Article[]> {
		return this.http.get(this.apiUrl)
		.map(response => response.json().articles);
	}

	getArticle(id: string) {
		return this.http.get(this.apiUrl + id)
		.map(response => response.json().article);
	}

	getArticlesCategories(id: string): Observable<Article[]> {
		return this.http.get(this.apiCategoryUrl + id)
		.map(response => response.json().articles);
	}

	addArticle(article: Object): Observable<Article[]> {
		return this.http.post(this.apiUrl, article)
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error || {message: "Server Error"}));
	}

	updateArticle(id, article: Object): Observable<Article[]> {
		return this.http.put(this.apiUrl + id, article)
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error || {message: "Server Error"}));
	}

	upload(file: Object): Observable<Object> {
		return this.http.post(this.apiUrl + 'uploads', file)
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error || {message: "Server Error"}));
	}

	deleteArticle(id: string): Observable<Article[]>{
		return this.http.delete(this.apiUrl + id)
		.map(response => response.json())
		.catch((error:any) => Observable.throw(error || {message: "Server Error"}));
	}

	getArticleNew(){
		return this.http.get(this.apiUrl + "/new-articles")
		.map(response => response.json().articles);
	}
}
