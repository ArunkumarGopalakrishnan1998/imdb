import { Component, inject } from '@angular/core';
import { Input } from '@angular/core';
import {TitleInterface} from '../../interfaces/TitleInterface';
import { TitlesService } from '../titles.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports: [RouterModule, CommonModule]
})
export class CardComponent {
  titleService: TitlesService = inject(TitlesService);
  @Input() item:TitleInterface = {} as TitleInterface;

  constructor(private router: Router) { }

  ngOnInit() {
    this.item.vote_average = Math.floor(this.item.vote_average * 10);
  }
  navigateToDetails(id: number): void {
    this.router.navigate(['/t', id]);
  }
}
