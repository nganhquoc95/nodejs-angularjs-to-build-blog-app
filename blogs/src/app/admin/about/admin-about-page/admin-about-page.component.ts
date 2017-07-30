import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../../models/page';
import { AdminPageService } from '../../../services/admin/admin-page.service';

@Component({
	selector: 'app-admin-about-page',
	templateUrl: './admin-about-page.component.html',
	styleUrls: ['./admin-about-page.component.css']
	})
export class AdminAboutPageComponent implements OnInit {

	page: Page;
	currentUser: any;

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private pageService: AdminPageService) {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if(!localStorage.getItem('currentUser')){
			this.router.navigate(['/admin/']);
		}

		this.pageService.getPage('about').subscribe(res=>{
			if(res.status=='success'){
				if(res.page!=null){
					this.page = res.page;
				}
			}
			else{
				console.log(res.message);
			}
		});
	}

	ngOnInit() {
	}

	updateAbout(data){
		data.page_type = "about";
		data.user_id = this.currentUser._id;
		if(this.page==undefined || this.page==null){
			this.pageService.addPage(data).subscribe(res=>{
				this.page = res.page;
			});
		}
		else{
			data._id = this.page._id;
			this.pageService.updatePage(data).subscribe(res=>{
				this.page = res.page;
			});
		}
	}
}
