import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Page } from '../../models/page';

@Injectable()
export class AdminPageService {
	apiUrl = 'http://localhost:8000/admin/page/';

	constructor(private http: Http) { }

	getPage(page_type: string) {
		return this.http.get(this.apiUrl + page_type, this._options())
			.map(response => response.json());
	}

	addPage(page: Object){
		return this.http.post(this.apiUrl, page, this._options())
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	updatePage(page: Object){
		return this.http.put(this.apiUrl + page["_id"], page, this._options())
			.map((response: Response)=>response.json())
			.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	}

	// deletePage(id: string){
	// 	return this.http.delete(this.apiUrl + id, this._options())
	// 	.map(response => response.json())
	// 	.catch((error:any) => Observable.throw(error.json().error || {message: "Server Error"}));
	// }

	private _options(): RequestOptions{
		let tmpUser = localStorage.getItem('currentUser');
		if(tmpUser != "undefined" && tmpUser != null){
			let user = JSON.parse(tmpUser);
			let headers = new Headers({ 'Authorization': user._id + ":" + user.password });
	  		return new RequestOptions({ headers: headers, withCredentials: true });
		}
	}
}
