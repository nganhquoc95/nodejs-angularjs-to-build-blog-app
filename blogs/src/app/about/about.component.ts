import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../services/page.service';
import { Page } from '../models/page';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.css']
	})
export class AboutComponent implements OnInit, OnDestroy {

	sub: any;
	page: Page;
	_page: string;
	message: string;

	constructor(private pageService: PageService, private activatedRoute: ActivatedRoute) {
		this.sub = this.activatedRoute.params.subscribe(params => {
			this._page = params['page'];
		});

		this.pageService.getPage(this._page, 'about').subscribe( data => {
			if( data.status == "404" || data.status == "error"){
				this.message = data.message;
			}
			this.page = data.page
		});
	}

	ngOnInit() {

	}

	ngOnDestroy() {
    	this.sub.unsubscribe();
  	}
}
