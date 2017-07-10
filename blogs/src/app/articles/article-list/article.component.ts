import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article';
import { User } from '../../models/user';

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styles: []
})

export class ArticleComponent implements OnInit, OnDestroy {
	@Input() article: Article;

	user: User;
	
	sub: any;

	page: string;

	constructor(private activatedRoute: ActivatedRoute) {
		this.user = JSON.parse(localStorage.getItem('currentUser'));
	}

	ngOnInit() {
		this.sub = this.activatedRoute.params.subscribe(params => this.page = params['page']);
	}

	ngOnDestroy() {
    	this.sub.unsubscribe();
  	}

	srcImage(image){
		if(image != undefined && image != "")
			return "http://localhost:8000/uploads/"+image;
		return "/assets/images/image-not-found.png";
	}
}
