import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article';
import { Category } from '../../models/category';
import { ArticleService } from '../../services/article.service';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-admin-article-edit',
	templateUrl: './admin-article-edit.component.html',
	styleUrls: ['./admin-article-edit.component.css']
})
export class AdminArticleEditComponent implements OnInit, OnDestroy {
	status: string;
	message: string;

	id: any;
	params: any;

	categories: Observable<Category[]>;

	@Input() article : Article;

	constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService, private categoryService: CategoryService) { }

	ngOnInit() {

		this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);

		this.articleService.getArticle(this.id).subscribe(
			article=>this.article = article
		);

		this.categories = this.categoryService.getCategories();
	}

	ngOnDestroy() {
		this.params.unsubscribe();
	}

	updateArticle(article) {
		this.articleService.updateArticle(article)
		.subscribe(
			article=>{
				console.log(article);
				this.status = "success";
				this.message = "Cập nhật bài viết thành công";
			},
			error => {
				console.log(<any>error);
				this.status = "error";
				this.message = error['message'];
			}
		);
	}

	onSelected(item){
		this.article.category_id = item;
	}
}
