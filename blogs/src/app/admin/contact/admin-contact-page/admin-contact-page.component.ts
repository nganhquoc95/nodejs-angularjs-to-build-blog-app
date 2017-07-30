import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../../models/page';
import { AdminPageService } from '../../../services/admin/admin-page.service';

@Component({
	selector: 'app-admin-contact-page',
	templateUrl: './admin-contact-page.component.html',
	styleUrls: ['./admin-contact-page.component.css']
})
export class AdminContactPageComponent implements OnInit {

	page: Page;
	currentUser: any;

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private pageService: AdminPageService) {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if(!localStorage.getItem('currentUser')){
			this.router.navigate(['/admin/']);
		}

		this.pageService.getPage('contact').subscribe(res=>{
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

	updateContact(data){
		data.page_type = "contact";
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
