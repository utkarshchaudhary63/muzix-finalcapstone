import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  constructor(private http:HttpClient) { }
  private MyAPIKey: string = "fc2a36e30054ad786538566df9c7f003"; 
  // url:string='https://api.themoviedb.org/3';
  
  getSearchMovies(moviename:any) {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${this.MyAPIKey}&original_language=en&query=${moviename}&page=1&include_adult=false&sort_by=popularity.desc`;
    
    return this.http.get<any>(url);
  }
  
  getSearchMoviesByLanguage(movieLanguage:String,currentPage:number)
  {
    let url1=`
    https://api.themoviedb.org/3/discover/movie?api_key=${this.MyAPIKey}&sort_by=popularity.desc&page=${currentPage}&with_original_language=${movieLanguage}&with_watch_monetization_types=free`
    return this.http.get<any>(url1);
  }
  
  getSearchMoviesByGenre(genrename:any,currentPage:number)
  {
    let url2=`https://api.themoviedb.org/3/discover/movie?api_key=${this.MyAPIKey}&page=${currentPage}&with_genres=${genrename}&sort_by=popularity.desc`
    return this.http.get<any>(url2);
  }
  
  // =====================================RATING================================================
  
  
  getSearchMoviesByRating(rating:any,currentPage:number)
  {
  let url3=`
  https://api.themoviedb.org/3/discover/movie?api_key=${this.MyAPIKey}&page=${currentPage}&vote_average.gte=${rating}&sort_by=popularity.desc`
  return this.http.get<any>(url3);
  }
  
  getSearchBelowRating(rating:any,currentPage:number)
  {
  let url3=`
  https://api.themoviedb.org/3/discover/movie?api_key=${this.MyAPIKey}&page=${currentPage}&vote_average.lte=${rating}`
  return this.http.get<any>(url3);
  }
  
  // =====================================TIME======================================================
  
  
  getSearchByLatest(currentPage:number)
  {
    let url4=`https://api.themoviedb.org/3/discover/movie?api_key=${this.MyAPIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&release_date.gte=2022-06-12&release_date.lte=2023-02-14&sort_by=popularity.desc`
    return this.http.get<any>(url4);
  }
  getSearchByOlder(currentPage:number)
  { 
    let url5=`https://api.themoviedb.org/3/discover/movie?api_key=${this.MyAPIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&release_date.gte=1970&release_date.lte=2000&sort_by=popularity.desc`
  return this.http.get<any>(url5);
  }
  
  getSearchByMedium(currentPage:number){
    let url6=`https://api.themoviedb.org/3/discover/movie?api_key=${this.MyAPIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&release_date.gte=2000&release_date.lte=2010&sort_by=popularity.desc`
    return this.http.get<any>(url6);
  }
  
  getSearchByUpcom(currentPage:number)
  {
    let url7=`https://api.themoviedb.org/3/discover/movie?api_key=${this.MyAPIKey}&sort_by=popularity.desc&page=${currentPage}&release_date.gte=2023`
    return this.http.get<any>(url7);
  }

}
