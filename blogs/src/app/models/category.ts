export class Category {
	constructor(
		public _id:string,
		public title:string,
		public describe:string,
		public image:string,
		public visibility:boolean,
		public updated_on:number,
		public created_on:number
		) { }
}
