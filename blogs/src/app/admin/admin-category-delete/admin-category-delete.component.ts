import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCategoryService } from '../../services/admin/category.service';

@Component({
  selector: 'app-admin-category-delete',
  templateUrl: './admin-category-delete.component.html',
  styleUrls: ['./admin-category-delete.component.css']
})
export class AdminCategoryDeleteComponent implements OnInit, OnDestroy {
	id: any;
	params: any;
	status: string;
	message: string;
	constructor(
		private activatedRoute: ActivatedRoute,
		private categoryService: AdminCategoryService,
		private router: Router) { }

	ngOnInit() {
		this.params = this.activatedRoute.params.subscribe(params=>this.id=params['id']);

		this.categoryService.deleteCategory(this.id)
			.subscribe(
				data => {
					this.status = data.status;
					this.message = data.message;
					this.router.navigate(['/admin/categories']);
				},
				error => {
					this.status = "error";
					this.message = (<any>error).toString();
				});
	}

	ngOnDestroy(){
		this.params.unsubscribe();
	}
}
