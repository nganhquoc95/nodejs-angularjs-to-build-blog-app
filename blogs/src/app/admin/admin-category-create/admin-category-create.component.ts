import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
	selector: 'app-admin-category-create',
	templateUrl: './admin-category-create.component.html',
	styleUrls: ['./admin-category-create.component.css']
})
export class AdminCategoryCreateComponent implements OnInit {

	constructor(private categoryService: CategoryService, private router: Router) { }

	ngOnInit() {

	}

	onSubmitCreate(category){
		this.categoryService.addCategory(category)
		.subscribe( category=>{
			console.log(category);
			this.router.navigate(['/admin/categories']);
		},
		error => console.log(<any>error));
	}
}
