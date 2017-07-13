import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { Article } from '../../models/article';
import { Comment } from '../../models/comment';
import { ArticleService } from '../../services/article.service';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { CommentService } from '../../services/comment.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-article-detail',
	templateUrl: './article-detail.component.html',
	styleUrls: ['./article-detail.component.css']
})

export class ArticleDetailComponent implements OnInit, OnDestroy {

	selectedArticle: Article;

	sub: any;

	comment: string;

	comments: Comment[] = [];

	users: User[] = [];

	page: string;

	isAllowComment: boolean = false;

	user: User;

	constructor(
		private userService: UserService,
		private activatedRoute: ActivatedRoute,
		private articleService: ArticleService,
		private categoryService: CategoryService,
		private commentService: CommentService,
		@Inject(Window) private window: Window) {

		this.comment = "";
		if(localStorage.getItem('currentUser') != null && localStorage.getItem('currentUser') != "undefined"){
			this.user = JSON.parse(localStorage.getItem('currentUser'));
			this.isAllowComment = true;
		}

		this.articleService.configObservable.subscribe( res => {
			this.isAllowComment = res;
		});
	}


	doComment(): void{
		if(localStorage.getItem('currentUser') != null && localStorage.getItem('currentUser') != "undefined"){
			let obj = {
				user_id: this.user._id,
				article_id: this.selectedArticle._id,
				content: this.comment
			};

			this.commentService.comment(obj).subscribe( res => {
				this.comments.unshift(res.comment);
				if(this.users.filter(function(obj){
					let user = JSON.parse(localStorage.getItem('currentUser'));
					return obj._id === user._id;
				}).length===0){
					this.users.push(this.user);
				}
			});

			this.comment = "";
		}
		else{
			alert('Bạn chưa đăng nhập, đăng nhập để có thể bình luận cùng bạn bè.');
		}
	}

	doRemove(id: string, comment): void{
		let cmt = this.comments.find(cmt => cmt._id == id);
		let indexCmt = this.comments.indexOf(cmt);
		if(indexCmt != -1){
			this.commentService.delete(id)
			.subscribe( res=>{
				comment.remove();
				this.comments.splice(indexCmt, 1);
			});
		}
	}

	onClickUserPage(page: string){

		// Lấy thông tin bài viết mới của người dùng
		this.articleService.getArticleNew(page).subscribe(res=>{
			if(res.status == "success"){
				this.articleService.emitArticleNew(JSON.stringify(res));
			}
		});

		// Lấy tất cả danh mục của trang người dùng
		this.categoryService.getCategories(page).subscribe(res=>{
			if(res.status=="success"){
				this.categoryService.emitCategories(JSON.stringify(res));
			}
		});

		this.userService.getByPage(page).subscribe(res=>{
			if(res.status == "success"){
				this.userService.emitConfig(JSON.stringify(res.user));
			}
		});
	}

	ngOnInit() {
		this.page = this.window.location.pathname.split('/')[1] || 'NguyenAnhQuoc';

		this.sub = this.activatedRoute.data.subscribe((data: {article: Article}) => {
			this.selectedArticle = data.article;
			this.commentService.getCommentsArticle(this.selectedArticle._id)
			.subscribe( res => {
				this.comments = res.comments.reverse();
				this.users = res.users;
			});
		});
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
	}
}
