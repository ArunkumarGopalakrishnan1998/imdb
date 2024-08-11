import { Injectable } from '@angular/core';
import { TitleInterface } from 'src/interfaces/TitleInterface';  
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TitleDetailsInterface } from 'src/interfaces/TitleDetailsInterface';
import { TitleCreditsIntefrace } from 'src/interfaces/TitleCreditsInterface';
import { TitleVideoInterface } from 'src/interfaces/TitleVideo';
import { TitleImageInterface } from 'src/interfaces/TitleImage';
import {TitleReviewInterface} from 'src/interfaces/TitleReviewInterface';
import { TitleLinkInterface } from 'src/interfaces/TitleLinkInterface';
import { PersonInterface } from 'src/interfaces/PersonInterface';

@Injectable({
    providedIn: 'root'
  })
export class TitlesService {

  appKey: string = 'd9ac453707a96bb564ef3bbfc4e16d55';
  imgBaseUrl: string = 'https://image.tmdb.org/t/p/original/';
  movieBaseUrl: string = 'https://api.themoviedb.org/3/movie/';
  personBaseUrl: string = 'https://api.themoviedb.org/3/person/';
  watchLinkUrl: string = 'https://www.themoviedb.org/movie/';
  popularMovies: TitleInterface[] = [];
  isDarkMode: boolean = false;

  getPopularMovies(): TitleInterface[] {
    return this.popularMovies;
  }

  getMovieList(type: string): Observable<{results: TitleInterface[]}> {
    return this.http.get<{results:TitleInterface[]}>(`${this.movieBaseUrl}${type}?api_key=${this.appKey}`)
  }

  getMovieDetails(title_id: number): Observable<TitleDetailsInterface>{
    return this.http.get<TitleDetailsInterface>(`${this.movieBaseUrl}${title_id}?api_key=${this.appKey}`)
  }

  getMovieCredits(title_id: number): Observable<TitleCreditsIntefrace>{
    return this.http.get<TitleCreditsIntefrace>(`${this.movieBaseUrl}${title_id}/credits?api_key=${this.appKey}`)
  }

  getMovieVideos(title_id: string): Observable<{results:TitleVideoInterface[]}>{
    return this.http.get<{results:TitleVideoInterface[]}>(`${this.movieBaseUrl}${title_id}/videos?api_key=${this.appKey}`)
  }

  getMovieImages(title_id: string): Observable<{posters:TitleImageInterface[]}>{
    return this.http.get<{posters:TitleImageInterface[]}>(`${this.movieBaseUrl}${title_id}/images?api_key=${this.appKey}`)
  }

  getMovieReviews(title_id: string): Observable<{results:TitleReviewInterface[]}>{
    return this.http.get<{results:TitleReviewInterface[]}>(`${this.movieBaseUrl}${title_id}/reviews?api_key=${this.appKey}`)
  }

  getMovieLinks(title_id: string): Observable<TitleLinkInterface>{
    return this.http.get<TitleLinkInterface>(`${this.movieBaseUrl}${title_id}/external_ids?api_key=${this.appKey}`)
  }

  getPersonDetails(id: string): Observable<PersonInterface> {
    return this.http.get<PersonInterface>(`${this.personBaseUrl}${id}?api_key=${this.appKey}`)
  }

  getPersonMovieCredits(id: string): Observable<{cast: TitleInterface[]}> {
    return this.http.get<{cast:TitleInterface[]}>(`${this.personBaseUrl}${id}/movie_credits?api_key=${this.appKey}`)
  }

  getPersonCombinedCredits(id: string): Observable<{cast: TitleInterface[]}> {
    return this.http.get<{cast:TitleInterface[]}>(`${this.personBaseUrl}${id}/combined_credits?api_key=${this.appKey}`)
  }

  getPersonImages(id: string): Observable<{profiles: TitleImageInterface[]}> {
    return this.http.get<{profiles:TitleImageInterface[]}>(`${this.personBaseUrl}${id}/images?api_key=${this.appKey}`)
  }

  toggleTheme(): void {
    if (this.isDarkMode) {
      this.setTheme("light");
    } else {
      this.setTheme("dark");
    }
  }

  setTheme(theme: string): void {
    if (theme == "light") {
      (document.querySelector(':root') as HTMLElement).style.setProperty('--themeColor', 'white');
      (document.querySelector(':root') as HTMLElement).style.setProperty('--primaryFontColor', '#151515');
      (document.querySelector(':root') as HTMLElement).style.setProperty('--secondaryThemeColor', '#dadada');
      (document.querySelector(':root') as HTMLElement).style.setProperty('--secondaryFontColor', '#363636');
      this.isDarkMode = false;
      localStorage.setItem("ak_imdb_theme", "light");
    } else {
      (document.querySelector(':root') as HTMLElement).style.setProperty('--themeColor', '#151515');
      (document.querySelector(':root') as HTMLElement).style.setProperty('--primaryFontColor', 'white');
      (document.querySelector(':root') as HTMLElement).style.setProperty('--secondaryThemeColor', '#252525');
      (document.querySelector(':root') as HTMLElement).style.setProperty('--secondaryFontColor', '#767676');
      this.isDarkMode = true
      localStorage.setItem("ak_imdb_theme", "dark");
    }
  }
  constructor(private http:HttpClient) { 
    let theme = localStorage.getItem("ak_imdb_theme") || "light";
    this.setTheme(theme);
  }
}
