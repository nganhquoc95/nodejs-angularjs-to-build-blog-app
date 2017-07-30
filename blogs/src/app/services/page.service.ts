import { Http, Response } from "@angular/http";
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Page } from '../models/page';

@Injectable()
export class PageService {

	apiUrl = 'http://localhost:8000/page/';

	constructor(private http: Http) { }

	getPage(page: string, page_type: string) {
		return this.http.get(this.apiUrl + page + "/" + page_type)
			.map(response => response.json());
	}
}
