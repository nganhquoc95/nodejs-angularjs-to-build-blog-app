import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
	})
export class DashboardComponent implements OnInit {

	user: object;
	constructor() { }

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('currentUser'));
	}
}
