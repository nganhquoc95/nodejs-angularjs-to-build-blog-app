import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
	}

}
