import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

	apiUrl = 'http://localhost:8000/login/';
  	constructor(private http: Http) { }

  	login(auth: any){
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this.apiUrl, JSON.stringify(auth), options)
			.map((response: Response)=> {
				let obj = response.json();
				if (obj.user) {
					localStorage.setItem('currentUser', JSON.stringify(obj.user[0]));
				}
				return response.json();
			});
	}

	logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}