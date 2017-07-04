import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { AdminCategoryService } from '../../services/admin/category.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-admin-category-list',
	templateUrl: './admin-category-list.component.html',
	styleUrls: ['./admin-category-list.component.css']
})
export class AdminCategoryListComponent implements OnInit {

	categories: Observable<Category[]>;
	
	constructor(private categoryService: AdminCategoryService) { }

	ngOnInit() {
		this.categories = this.categoryService.getCategories();
	}

}
