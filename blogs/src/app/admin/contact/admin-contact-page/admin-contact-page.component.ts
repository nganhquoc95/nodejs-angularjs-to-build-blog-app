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
		if(!localStorage.getItem('currentUser') || this.currentUser.role!="admin"){
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
		let created = new Date().getTime();
		this.page = new Page("0","","",this.currentUser._id, "contact", created, created);
	}

	updateContact(data){
		data._id = this.page._id;
		data.page_type = "contact";
		data.user_id = this.currentUser._id;
		if(this.page._id=="0"){
			this.pageService.addPage(data).subscribe(res=>{
				this.page = res.page;
			});
		}
		else{
			this.pageService.updatePage(data).subscribe(res=>{
				this.page = res.page;
			});
		}
	}

}
