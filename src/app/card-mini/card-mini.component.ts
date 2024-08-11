import { Component, inject } from '@angular/core';
import { Input } from '@angular/core';
import {TitleInterface} from '../../interfaces/TitleInterface';
import { TitleCredit } from 'src/interfaces/TitleCreditsInterface';
import { TitlesService } from '../titles.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-card-mini',
  templateUrl: './card-mini.component.html',
  styleUrls: ['./card-mini.component.css'],
  imports: [RouterModule, CommonModule]
})
export class CardMiniComponent {
  titleService: TitlesService = inject(TitlesService);
  @Input() item:TitleCredit = {} as TitleCredit;

  constructor(private router: Router) { }

  navigateToDetails(id: number): void {
    this.router.navigate(['/p', id]);
  }
}
