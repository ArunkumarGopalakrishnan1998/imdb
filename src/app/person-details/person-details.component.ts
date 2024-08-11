import { Component, inject } from '@angular/core';
import { TitlesService } from '../titles.service';
import { PersonInterface } from 'src/interfaces/PersonInterface';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { TitleInterface } from 'src/interfaces/TitleInterface';
import { TitleImageInterface } from 'src/interfaces/TitleImage';
import { Router, RouterModule } from '@angular/router';
import { PreviewComponent } from '../preview/preview.component';
@Component({
  standalone: true,
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css'],
  imports: [CommonModule, RouterModule, RouterLink, CardComponent, PreviewComponent]
})
export class PersonDetailsComponent {

  titleService: TitlesService = inject(TitlesService);
  person: PersonInterface = {} as PersonInterface;
  person_id: string = '';
  person_known_for: TitleInterface[] = [] as TitleInterface[];
  person_images: TitleImageInterface[] = [] as TitleImageInterface[];
  person_credits: TitleInterface[] = [] as TitleInterface[];
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.route.params.subscribe(params => {

      this.person_id = params['id'];

      this.titleService.getPersonDetails(this.person_id).subscribe(resp => {
        console.log("Person... ", resp);
        this.person = resp;
      })

      this.titleService.getPersonMovieCredits(this.person_id).subscribe(resp => {
        resp.cast.sort(function(a, b) {
          return b.popularity - a.popularity;
        });
        this.person_known_for = resp.cast.splice(0,10);
      })

      this.titleService.getPersonCombinedCredits(this.person_id).subscribe(resp => {

        resp.cast.forEach((item) => {
          if (item.title && item.release_date) {
            item.release_date = String(new Date(item.release_date).getFullYear());
            this.person_credits.push(item);
          }
        })
        this.person_credits.sort(function(a, b) {
          return new Date(b.release_date).getTime()  - new Date(a.release_date).getTime();
        });

        debugger
      })

      this.titleService.getPersonImages(this.person_id).subscribe(resp => {
        this.person_images = resp.profiles;
      })
    })
  }

  navigateToDetails(id: number): void {
    this.router.navigate(['/t', id]);
  }

  openImage(url: string): void {
    this.router.navigate(['/o', url]);
  }
}
