import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { AdminArticleService } from '../../services/admin/article.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-admin-article-list',
	templateUrl: './admin-article-list.component.html',
	styleUrls: ['./admin-article-list.component.css']
})
export class AdminArticleListComponent implements OnInit {

	articles: Observable<Article[]>;
	constructor(private articleService: AdminArticleService) { }

	ngOnInit() {
		this.articles = this.articleService.getArticles();
	}

	srcImage(image){
		if(image != undefined && image != null && image != "")
			return "http://localhost:8000/uploads/"+image;
		return "/assets/images/image-not-found.png";
	}
}
