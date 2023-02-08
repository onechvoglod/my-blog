import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interface';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public sub: Subscription;
  public dSub: Subscription;
  public searchStr = '';

  constructor(
    private postsService: PostsService,
    private alertService: AlertService,) {
  }

  public ngOnInit() {
    this.sub = this.postsService.getAll().subscribe({
      next: posts => this.posts = posts,
    })
  }

  public remove(id: any) {
    this.postsService.remove(id).subscribe({
      next: () => {
        this.posts = this.posts.filter((post) => post.id !== id);
        this.alertService.warning('Піст було видалено');
      }
    })
  }

  public ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
