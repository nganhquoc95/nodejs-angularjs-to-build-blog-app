export class User {
	constructor(
		public _id:string,
		public name:string,
		public email:string,
		public password:string,
		public phone:string,
		public address:string,
		public gender:string,
		public born:number,
		public image:string,
		public role:string,
		public created_on:number,
		public updated_on:number
		) { }
}
