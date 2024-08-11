import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleInterface } from 'src/interfaces/TitleInterface';
import { HttpClient } from '@angular/common/http';
import { TitlesService } from '../titles.service';
import { TitleImageInterface } from 'src/interfaces/TitleImage';
import { TitleVideoInterface } from 'src/interfaces/TitleVideo';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
  imports: [CommonModule]
})
export class MediaComponent {
    @Input() titleId: string =  '';
    titleService: TitlesService = inject(TitlesService);
    titleVideos: TitleVideoInterface[] = [] as TitleVideoInterface[];
    titleImages: TitleImageInterface[] = [] as TitleImageInterface[];

    constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
      
    }

    ngOnInit() {
      
      this.titleService.getMovieVideos(this.titleId).subscribe(resp => {
        this.titleVideos = resp.results;
        if (this.titleVideos.length) {
          this.titleVideos.map(obj => {
            obj.preview = this.getVidPreviewUrl(obj.key); //show_preview
            obj.url = this.getVideoUrl(obj.key);
            obj.show_preview = false;
          })
        }
      })
      this.titleService.getMovieImages(this.titleId).subscribe(resp => {
        this.titleImages = resp.posters;
      })
    }

    getVidPreviewUrl(key: string): string {
      return `https://i.ytimg.com/vi/${key}/hqdefault.jpg`;
    }

    getVideoUrl(key: string): SafeResourceUrl {
      const videoUrl = `https://www.youtube.com/embed/${key}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }

    toggleVideo(obj: TitleVideoInterface) {
      obj.show_preview = !obj.show_preview;
    }

    getImgUrl(key: string): string {
      return this.titleService.imgBaseUrl + key;
    }
}
