import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

	apiUrl = 'http://localhost:8000/login/';

	public configObservable = new Subject<string>();

  	constructor(private http: Http) { }

  	emitConfig(val) {
	    this.configObservable.next(val);
	}

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