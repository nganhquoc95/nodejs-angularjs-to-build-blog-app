export class Article {
	constructor(
		public _id:string,
		public title:string,
		public describe:string,
		public content:string,
		public image:string,
		public visibility:boolean,
		public category_id:string,
		public updated_on:number,
		public created_on:number
		) { }
}
