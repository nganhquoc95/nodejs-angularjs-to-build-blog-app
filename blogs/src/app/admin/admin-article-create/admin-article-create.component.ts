import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Category } from '../../models/category';
import { ArticleService } from '../../services/article.service';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-admin-article-create',
	templateUrl: './admin-article-create.component.html',
	styleUrls: ['./admin-article-create.component.css']
})
export class AdminArticleCreateComponent implements OnInit {

	categories: Observable<Category[]>;

	constructor(private articleService: ArticleService, private categoryService: CategoryService, private router: Router) { }

	ngOnInit() {
		this.categories = this.categoryService.getCategories();
	}

	createArticle(article) {
		this.articleService.addArticle(article)
		.subscribe( article=>{
			console.log(article);
			this.router.navigate(['/admin/articles']);
		},
		error => console.log(<any>error));
	}
}
