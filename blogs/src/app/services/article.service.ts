import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Article } from '../models/article';
import { User } from '../models/user';

@Injectable()
export class ArticleService {

	apiUrl = 'http://localhost:8000/';

  	public configObservable = new Subject<boolean>();

  	public categoryObservable = new Subject<string>();

  	public articleNewObservable = new Subject<string>();

	constructor(private http:Http) { }

	emitConfig(val) {
	    this.configObservable.next(val);
	}

	emitCategory(val) {
	    this.categoryObservable.next(val);
	}

	emitArticleNew(val) {
	    this.articleNewObservable.next(val);
	}

	getArticles(page: string): Observable<Article[]> {
		return this.http.get(this.apiUrl + page + "/articles", this._options())
		.map(response => response.json().articles);
	}

	getArticle(page: string, id: string) {
		return this.http.get(this.apiUrl + page + "/articles" + "/" + id, this._options())
		.map(response => response.json().article);
	}

	getArticlesCategories(page: string, id: string) {
		let per_page = 0;
		let headers = new Headers({ 'per_page': per_page });
	  	let requestOptions = new RequestOptions({ headers: headers, withCredentials: true });

		return this.http.get(this.apiUrl + page + "/articles" + '/category/' + id, requestOptions)
		.map(response => response.json());
	}

	getArticleNew(page: string){
		return this.http.get(this.apiUrl + page + "/articles" + "/new-articles", this._options())
		.map(response => response.json());
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
