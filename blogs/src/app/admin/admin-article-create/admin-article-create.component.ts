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
	isBusy = false;
	static imgLink: string;

	constructor(private articleService: ArticleService, private categoryService: CategoryService, private router: Router) { }

	ngOnInit() {
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
                    	AdminArticleCreateComponent.imgLink = xhr.response;
                    	let uri = "http://localhost:8000/uploads/";
                    	let imageSelected = document.getElementById('image-selected');

                    	imageSelected.style.backgroundImage = "url('" + uri + xhr.response + "')";
                    	imageSelected.style.backgroundSize = "100%";
                    	imageSelected.style.backgroundColor = "tranparent";
                    } else {
                        console.log(xhr.response);
                    }
                }
            }
            xhr.open("POST", apiUrl, true);
            xhr.send(formData);
		}
	}

	createArticle(article) {
		if(!this.isBusy){
			this.isBusy = true;
			if(AdminArticleCreateComponent.imgLink != ""){
				article.image = AdminArticleCreateComponent.imgLink;
			}

			this.articleService.addArticle(article)
			.subscribe( article=>{
				this.isBusy = false;
				this.router.navigate(['/admin/articles']);
			},
			error => console.log(<any>error));
		}
	}
}
