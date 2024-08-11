import { Routes } from '@angular/router';
import { BannerComponent } from './banner/banner.component'

const routeConfig: Routes = [
  {
    path: '',
    component: BannerComponent,
    title: 'Home page'
  },
];

export default routeConfig;