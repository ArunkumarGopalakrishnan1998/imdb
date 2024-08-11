import { Component } from '@angular/core';
import { Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitlesService } from '../titles.service';

@Component({
  standalone: true,
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {

  img_src: string = '';
  titleService: TitlesService = inject(TitlesService);

  constructor(private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.img_src = this.titleService.imgBaseUrl + params['url'];
    })
  }
}
