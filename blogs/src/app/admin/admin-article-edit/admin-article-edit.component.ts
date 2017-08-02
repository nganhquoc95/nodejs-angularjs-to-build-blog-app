import { Component, OnInit, Input, OnDestroy, AfterViewChecked } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article';
import { Category } from '../../models/category';
import { AdminArticleService } from '../../services/admin/article.service';
import { AdminCategoryService } from '../../services/admin/category.service';
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
	static imgLink: string;

	categories: Observable<Category[]>;

	@Input() article : Article;

	constructor(private activatedRoute: ActivatedRoute, 
		private articleService: AdminArticleService, 
		private categoryService: AdminCategoryService) { }

	ngOnInit() {

		this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);

		this.articleService.getArticle(this.id).subscribe(
			article=>this.article = article
		);

		this.categories = this.categoryService.getCategories();
	}

	fileChange($event): void {
		let fileList: FileList = $event.target.files;
		let apiUrl = 'http://localhost:8000/articles/uploads';
		if (fileList.length > 0) {
			let file: File = fileList[0];
			let formData: FormData = new FormData();
			formData.append('uploadFile', file);

			var xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                    	AdminArticleEditComponent.imgLink = xhr.response;
                    	let uri = "http://localhost:8000/uploads/";
                    	let imageSelected = document.getElementById('image-selected');

                    	imageSelected.style.backgroundImage = "url('" + uri + xhr.response + "')";
                    	imageSelected.style.backgroundSize = "100%";
                    } else {
                        console.log(xhr.response);
                    }
                }
            }
            xhr.open("POST", apiUrl, true);
            let user = JSON.parse(tmpUser);
            xhr.setRequestHeader('Authorization', user._id + ":" + user.password);
            xhr.send(formData);
		}
	}

	ngOnDestroy() {
		this.params.unsubscribe();
	}

	updateArticle(article) {
		let headers = new Headers();
			headers.append('Content-Type', 'json');
			headers.append('Accept', 'multipart/form-data');

		if(AdminArticleEditComponent.imgLink != ""){
			article.image = AdminArticleEditComponent.imgLink;
		}

		this.articleService.updateArticle(article._id, article)
		.subscribe(
			response => {
				this.status = response.status;
				this.message = response.message;
				this.article = response.article;
			},
			error => {
				console.log(<any>error);
				this.status = "error";
				this.message = error['message'];
			}
		);

		this.scrollToTop(100);
	}

	scrollToTop(scrollDuration) {
	    var scrollStep = -window.scrollY / (scrollDuration / 15),
	        scrollInterval = setInterval(function(){
		        if ( window.scrollY != 0 ) {
		            window.scrollBy( 0, scrollStep );
		        }
		        else clearInterval(scrollInterval); 
		    },15);
	}

	onSelected(item){
		this.article.category_id = item;
	}
}
