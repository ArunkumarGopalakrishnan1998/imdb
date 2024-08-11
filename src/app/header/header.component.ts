import { Component, inject } from '@angular/core';
import { TitlesService } from '../titles.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    logoUrl = '../../assets/logo.png';
    titleService: TitlesService = inject(TitlesService);
    // toggleTheme() {
    //   this.titleService.toggleTheme();
    // }
}
