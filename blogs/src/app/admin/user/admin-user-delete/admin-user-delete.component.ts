import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-user-delete',
  templateUrl: './admin-user-delete.component.html',
  styleUrls: ['./admin-user-delete.component.css']
})
export class AdminUserDeleteComponent implements OnInit, OnDestroy {
	id: any;
	params: any;
	user: User;

  	constructor(private activatedRoute: ActivatedRoute,private userService: UserService, private router: Router) {
  		this.user = JSON.parse(localStorage.getItem('currentUser'));
		if(!localStorage.getItem('currentUser') || this.user.role!="admin"){
			this.router.navigate(['/admin/']);
		}
  	}

  	ngOnInit() {
  		this.params = this.activatedRoute.params.subscribe(params=>this.id=params['id']);

  		this.userService.delete(this.id)
			.subscribe(
				data => {
					console.log(data);
					this.router.navigate(['/admin/users']);
				},
				error => console.log(<any>error));
  	}

  	ngOnDestroy(){
		this.params.unsubscribe();
	}
}
