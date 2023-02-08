import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/shared/interface';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public post: Post;
  public submited = false;
  public uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alertService: AlertService,
  ) { }

  public ngOnInit() {
    this.route.params.pipe(
      switchMap((params) => {
        return this.postsService.getById(params['id']);
      })
    ).subscribe({
      next: (post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        })
      }
    })
  }

  public submit() {
    this.submited = true;

    const uSub = this.postsService.update({
      ...this.post,
      title: this.form.value,
      text: this.form.value
    }).subscribe(() => {
      this.submited = false;
      this.alertService.success('Піст було оновлено');
    })
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }
}
