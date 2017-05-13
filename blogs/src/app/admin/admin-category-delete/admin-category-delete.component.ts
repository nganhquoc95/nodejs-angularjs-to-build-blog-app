import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-admin-category-delete',
  templateUrl: './admin-category-delete.component.html',
  styleUrls: ['./admin-category-delete.component.css']
})

export class AdminCategoryDeleteComponent implements OnInit, OnDestroy  {
	id: any;
	params: any;

	constructor(private activatedRoute: ActivatedRoute,private categoryService: CategoryService, private router: Router) { }

	ngOnInit() {
		this.params = this.activatedRoute.params.subscribe(params=>this.id=params['id']);

		this.categoryService.deleteCategory(this.id)
			.subscribe(
				data => {
					console.log(data);
					this.router.navigate(['/admin/categories']);
				},
				error => console.log(<any>error));
	}

	ngOnDestroy(){
		this.params.unsubscribe();
	}
}
