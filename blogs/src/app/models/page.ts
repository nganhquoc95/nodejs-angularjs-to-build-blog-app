export class Page {
	constructor(
		public _id:string,
		public describe:string,
		public content:string,
		public user_id:string,
		public page_type:string,
		public updated_on:number,
		public created_on:number
		) { }
}
