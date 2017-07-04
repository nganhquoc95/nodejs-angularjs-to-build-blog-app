import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { AdminCategoryService } from '../../services/admin/category.service';
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

	constructor(private activatedRoute: ActivatedRoute, private categoryService: AdminCategoryService) { }

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
			response => {
				this.status = response.status;
				this.message = response.message;
			},
			error => {
				console.log(<any>error);
				this.status = "error";
				this.message = error['message'];
			}
		);
	}
}
