import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
// import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-admin-category-edit',
	templateUrl: './admin-category-edit.component.html',
	styleUrls: ['./admin-category-edit.component.css']
})
export class AdminCategoryEditComponent implements OnInit, OnDestroy {
	status: string;
	message: string;

	id: any;
	params: any;

	@Input() category : Category;

	constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService) { }

	ngOnInit() {
		this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);

		this.categoryService.getCategory(this.id).subscribe(
			category=>this.category = category
		);
	}

	ngOnDestroy(){
		this.params.unsubscribe();
	}

	updateCategory(category) {
		this.categoryService.updateCategory(category)
		.subscribe(
			category=>{
				console.log(category);
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
}
