import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Category } from '../models/category';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryResolverService implements Resolve<Category[]>{

	constructor(private categoryService: CategoryService,private router: Router) { }

	resolve(route: ActivatedRouteSnapshot): Observable<Category[]> {

		let page = route.params['page'];

		return this.categoryService.getCategories(page).map(
			categories => {
				if (categories) {
					return categories;
				} else {
					return null;
				}
			}
		);
	}
}
