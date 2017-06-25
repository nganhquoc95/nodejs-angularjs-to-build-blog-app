import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
	})
export class DashboardComponent implements OnInit {

	user: object;
	constructor(private router: Router) {
		if(!localStorage.getItem("currentUser")){
			this.router.navigate(['/']);
		}
	}

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('currentUser'));
	}
}
