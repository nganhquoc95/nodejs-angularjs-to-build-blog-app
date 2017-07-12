export class Comment {
	constructor(
		public _id:string,
		public user_id:string,
		public article_id:string,
		public content:string,
		public created_on:number,
		public updated_on:number
		) { }
}
