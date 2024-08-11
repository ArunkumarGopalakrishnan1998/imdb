import { Component, inject, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TitlesService } from '../titles.service';
import { TitleDetailsInterface } from 'src/interfaces/TitleDetailsInterface';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TitleCreditsIntefrace, TitleCredit } from 'src/interfaces/TitleCreditsInterface';
import { CardMiniComponent } from '../card-mini/card-mini.component';
import { MediaComponent } from '../media/media.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { TitleLinkInterface } from 'src/interfaces/TitleLinkInterface';
import { PreviewComponent } from '../preview/preview.component';

@Component({
  standalone: true,
  selector: 'app-title-details',
  templateUrl: './title-details.component.html',
  styleUrls: ['./title-details.component.css'],
  imports: [CommonModule, RouterLink, CardMiniComponent, MediaComponent, ReviewsComponent, PreviewComponent]
})
export class TitleDetailsComponent {

  titleService: TitlesService = inject(TitlesService);

  selectedTitle: TitleDetailsInterface = {} as TitleDetailsInterface;
  @Output() titleId: string = '';
  selectedtitleCredits: TitleCreditsIntefrace = {} as TitleCreditsIntefrace;
  votingPercentage: string = '';
  watchLink: string = '';
  budget: string = '';
  revenue: string = '';
  topCasting: TitleCredit[] = [] as TitleCredit[]; 
  links: TitleLinkInterface = {} as TitleLinkInterface;
  producer: TitleCredit = {} as TitleCredit; 
  director: TitleCredit = {} as TitleCredit; 
  dop: TitleCredit = {} as TitleCredit; 
  musicComposer: TitleCredit = {} as TitleCredit;

  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    this.route.params.subscribe(params => {

      this.titleId = params['id'];

      this.titleService.getMovieDetails(params['id']).subscribe(resp => {

        this.selectedTitle = resp;

        this.votingPercentage = String(Math.floor(resp.vote_average) * 10) + '%';
        (document.getElementsByClassName('title__details__ratings')[0] as HTMLElement).style.width = this.votingPercentage;
      
        this.watchLink = `${this.titleService.watchLinkUrl}${this.selectedTitle.id}/watch`;

        this.budget = (this.selectedTitle.budget).toLocaleString('en-US', {
          style: 'currency',
          maximumFractionDigits: 0,
          currency: 'USD'
        });
        this.revenue = (this.selectedTitle.revenue).toLocaleString('en-US', {
          style: 'currency',
          maximumFractionDigits: 0,
          currency: 'USD'
        });

      });

      this.titleService.getMovieCredits(params['id']).subscribe(resp => {

        this.selectedtitleCredits = resp;
        this.topCasting = this.selectedtitleCredits.cast.slice(0,10);
        this.producer = this.selectedtitleCredits.crew.find(obj => obj.job == 'Producer') as TitleCredit;
        this.director = this.selectedtitleCredits.crew.find(obj => obj.job == 'Director') as TitleCredit;
        this.dop = this.selectedtitleCredits.crew.find(obj => obj.job == 'Director of Photography') as TitleCredit;
        this.musicComposer = this.selectedtitleCredits.crew.find(obj => obj.job == 'Original Music Composer') as TitleCredit;

      });

      this.titleService.getMovieLinks(params['id']).subscribe(resp => {
        this.links = resp;
      });

    })
  }
}
