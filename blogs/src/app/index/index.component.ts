import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { ArticleService } from '../services/article.service';
// import { UserService } from '../services/user.service';
// import { CategoryService } from '../services/category.service';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
	})
export class IndexComponent implements OnInit {

	constructor(private router: Router) { 
		if(localStorage.getItem('currentUser') != null && localStorage.getItem('currentUser') != "undefined"){
			let user = JSON.parse(localStorage.getItem('currentUser'));
			this.router.navigate(['/' + user.page + '/bai-viet']);
		}
	}

	ngOnInit() {
		// // Lấy thông tin bài viết mới của người dùng
		// this.articleService.getArticleNew(page).subscribe(res=>{
		// 	if(res.status == "success"){
		// 		this.articleService.emitArticleNew(JSON.stringify(res));
		// 	}
		// });

		// // Lấy tất cả danh mục của trang người dùng
		// this.categoryService.getCategories(page).subscribe(res=>{
		// 	if(res.status=="success"){
		// 		this.categoryService.emitCategories(JSON.stringify(res));
		// 	}
		// });

		// this.userService.getByPage(page).subscribe(res=>{
		// 	if(res.status == "success"){
		// 		this.userService.emitConfig(JSON.stringify(res.user));
		// 	}
		// });
	}

}
