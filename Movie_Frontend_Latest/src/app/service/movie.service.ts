import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService
 {

  constructor(private http:HttpClient){};
  private MyAPIKey: string = "fc2a36e30054ad786538566df9c7f003"; 
  recMovieId:any;
 
  // url:string='https://api.themoviedb.org/3';
  
  getAllMovies(currentPage:number) {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.MyAPIKey}&page=${currentPage}`;
    
    return this.http.get<any>(url);
  }
  getLatestMovie(currentPage:number){
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.MyAPIKey}&language=en-US&page=${currentPage}`;
    return this.http.get<any>(url);
  }
  
  getPopularMovie(currentPage:number){
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.MyAPIKey}&language=en-US&page=${currentPage}`;
    return this.http.get<any>(url);
   
  }
  getUpcomingMovies(currentPage:number){
    let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.MyAPIKey}&language=en-US&page=${currentPage}`;
    return this.http.get<any>(url);
   
  } 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    
  createOrder(userData:any): Observable<any> {
    console.log('inside service')
    console.log(userData.amount)
    return this.http.post("http://localhost:5555/movie/api/v1//createOrder",userData, this.httpOptions);
  }

getTrailer(id:any)
{
  return new Promise((res,rej) => 
  {
    this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.MyAPIKey}&language=en-US`).subscribe(data => {
      res(data);
    })
  })
}
getmovie(id:number){
  return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.MyAPIKey}`)
}  

getAllRecommendedMovies(recommendMovieId:number,currentPage:any)
{
  let recommendedUrl=`https://api.themoviedb.org/3/movie/${recommendMovieId}/recommendations?api_key=${this.MyAPIKey}&language=en-US&page=${currentPage}`;
  return this.http.get(recommendedUrl);
}

getOriginals():Observable<any> {
  let url = `https://api.themoviedb.org/3/discover/tv?api_key=${this.MyAPIKey}`;
  return this.http.get<any>(url);
}

getNowPlayingMovies():Observable<any> {
  let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.MyAPIKey}`;
  return this.http.get<any>(url);
}
getlatest(){
  let url = `https://api.themoviedb.org/3/movie/latest?api_key=${this.MyAPIKey}&language=en-US`;

  return this.http.get<any>(url);
}
base_url:string = "https://api.themoviedb.org/3";

getMovieCast(data:any):Observable<any> 
{
  
  return this.http.get(`https://api.themoviedb.org/3/movie/${data}/credits?api_key=${this.MyAPIKey}`);
}


}
