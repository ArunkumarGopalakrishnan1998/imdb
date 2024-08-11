import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { StripeComponent } from './stripe/stripe.component';
import { RouterModule } from '@angular/router';
import { TitleDetailsComponent } from './title-details/title-details.component';
@Component({
  standalone: true, 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, StripeComponent, BannerComponent, HeaderComponent, TitleDetailsComponent]
})
export class AppComponent {
  title = 'imdb';
}

