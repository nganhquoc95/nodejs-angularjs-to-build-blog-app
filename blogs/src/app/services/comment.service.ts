import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Comment } from '../models/comment';

@Injectable()
export class CommentService {

	apiUrl = 'http://localhost:8000/comment/';

	public configObservable = new Subject<string>();

	constructor(private http:Http) { }

	emitConfig(val) {
	    this.configObservable.next(val);
	}

	getCommentsArticle(id: string) {
		return this.http.get(this.apiUrl + id, this._options())
		.map(response => response.json());
	}

	comment(article: Object){
		return this.http.post(this.apiUrl + article["article_id"] , article, this._options())
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	delete(id: string){
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