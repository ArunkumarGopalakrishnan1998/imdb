import { bootstrapApplication,provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { TitleDetailsComponent } from './app/title-details/title-details.component'
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { PersonDetailsComponent } from './app/person-details/person-details.component';
import { PreviewComponent } from './app/preview/preview.component';

// import {routeConfig} from './app/routes.js' as Routes;

const routeConfig: Routes = [

  {
    path: 't/:id',
    component: TitleDetailsComponent,
    title: 'Title'
  },
  {
    path: 'p/:id',
    component: PersonDetailsComponent,
    title: 'Person'
  },
  {
    path: 'o/:url',
    component: PreviewComponent,
    title: 'Preview'
  }
];
bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(),
      provideRouter(routeConfig),
      importProvidersFrom(HttpClientModule),
    ]
  }
).catch(err => console.error(err));