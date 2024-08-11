import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import {MatIconModule} from '@angular/material/icon';
import { BannerComponent } from './banner/banner.component';
import { CardComponent } from './card/card.component';
import { StripeComponent } from './stripe/stripe.component';
import { TitleComponent } from './title/title.component';
import { TitleDetailsComponent } from './title-details/title-details.component';
import { CardMiniComponent } from './card-mini/card-mini.component';
import { MediaComponent } from './media/media.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    CardComponent,
    StripeComponent,
    TitleComponent,
    TitleDetailsComponent,
    CardMiniComponent,
    MediaComponent,
    ReviewsComponent,
    PersonDetailsComponent,
    PreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
