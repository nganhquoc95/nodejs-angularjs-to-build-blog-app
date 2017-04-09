import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './models/category';
import { CategoryService } from './services/category.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styles: []
})
export class NavbarComponent implements OnInit {

	categories: Observable<Category[]>;

	constructor(private categoryService: CategoryService, private router: Router) { }

	ngOnInit() {
		this.categories = this.categoryService.getCategories();
	}

	onClicked(category){
		this.router.navigate(['/danh-muc',category.id]);
	}
}
