import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { TitlesService } from '../titles.service';
import { TitleReviewInterface } from 'src/interfaces/TitleReviewInterface';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  imports: [CommonModule]
})
export class ReviewsComponent {

  @Input() titleId: string = '';
  titleService: TitlesService = inject(TitlesService);
  reviews: TitleReviewInterface[] = [] as TitleReviewInterface[];
  activeReview: TitleReviewInterface = {} as TitleReviewInterface;

  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.titleService.getMovieReviews(this.titleId).subscribe(resp => {
      this.reviews = resp.results;
      this.activeReview = this.reviews[0];
      if (this.activeReview && this.activeReview.author_details && this.activeReview.author_details.rating) {
        let rating_width = String(this.activeReview.author_details.rating * 10) + '%';
        setTimeout(() => {
          (document.getElementsByClassName('reviews__author__rating')[0] as HTMLElement).style.width = rating_width;
        }, 100)
      }
      this.setDate();
    })
  }

  getAvatarUrl(path: string): string {
    return this.titleService.imgBaseUrl + path;
  }

  setDate() {
    if (this.activeReview.created_at) {
      let date = this.activeReview.created_at.split('T')[0],
          time = this.activeReview.created_at.split('T')[1].split('Z')[0];
          this.activeReview.created_at = 'on ' + date + ' at ' + time;
    }
  }

  nextReview(): void {
    let index = this.reviews.indexOf(this.activeReview);
    if (index >= 0 && index < this.reviews.length && this.reviews[index + 1]) {
      this.activeReview = this.reviews[index + 1];
      if (this.activeReview.author_details && this.activeReview.author_details.rating) {
        (document.getElementsByClassName('reviews__author__rating')[0] as HTMLElement).style.width = String(Math.round(this.activeReview.author_details.rating * 10)) + '%';
      }
      this.setDate();
    }
  }

  prevReview(): void {
    let index = this.reviews.indexOf(this.activeReview);
    if (index > 0 && index <= this.reviews.length && this.reviews[index - 1]) {
      this.activeReview = this.reviews[index - 1];
      if (this.activeReview.author_details && this.activeReview.author_details.rating) {
        (document.getElementsByClassName('reviews__author__rating')[0] as HTMLElement).style.width = String(Math.round(this.activeReview.author_details.rating * 10)) + '%';
      }
      this.setDate();
    }
  }
}
