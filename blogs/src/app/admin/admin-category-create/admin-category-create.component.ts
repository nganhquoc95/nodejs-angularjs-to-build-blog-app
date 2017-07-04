import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../models/category';
import { AdminCategoryService } from '../../services/admin/category.service';

@Component({
	selector: 'app-admin-category-create',
	templateUrl: './admin-category-create.component.html',
	styleUrls: ['./admin-category-create.component.css']
})
export class AdminCategoryCreateComponent implements OnInit {

	status: string;
	message: string;

	constructor(private categoryService: AdminCategoryService, private router: Router) { }

	ngOnInit() {
	}

	onSubmitCreate(category){
		this.categoryService.addCategory(category)
		.subscribe( response =>{
			this.status = response.status;
			this.message = response.message;
			this.router.navigate(['/admin/categories']);
		},
		error => console.log(<any>error));
	}
}
