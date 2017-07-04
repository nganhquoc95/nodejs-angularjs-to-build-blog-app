import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminArticleService } from '../../services/admin/article.service';

@Component({
	selector: 'app-admin-article-delete',
	templateUrl: './admin-article-delete.component.html',
	styleUrls: ['./admin-article-delete.component.css']
})
export class AdminArticleDeleteComponent implements OnInit, OnDestroy {
	id: any;
	params: any;

	constructor(private activatedRoute: ActivatedRoute,private articleService: AdminArticleService, private router: Router) { }

	ngOnInit() {
		this.params = this.activatedRoute.params.subscribe(params=>this.id=params['id']);

		this.articleService.deleteArticle(this.id)
			.subscribe(
				data => {
					console.log(data);
					this.router.navigate(['/admin/articles']);
				},
				error => console.log(<any>error));
	}

	ngOnDestroy(){
		this.params.unsubscribe();
	}
}
