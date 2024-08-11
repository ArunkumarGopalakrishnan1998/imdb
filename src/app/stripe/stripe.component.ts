import { Component, Input, Output, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardComponent } from '../card/card.component';
import {TitleInterface} from '../../interfaces/TitleInterface';
import { TitlesService } from '../titles.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css'],
  imports: [CommonModule, CardComponent]
})

export class StripeComponent {

    titlesService: TitlesService = inject(TitlesService);

    @Output() list : TitleInterface[] = [];
    @Input() type: string = '';

    constructor() {}

    ngOnInit() {
      this.titlesService.getMovieList(this.type).subscribe(resp => {
        this.list = resp.results!;
      })
    }
}
