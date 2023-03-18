import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavlistService {

  constructor(private http:HttpClient) { }
  
  base_url:string="http://localhost:5555/movie/api/v1/"
 



addMovie(favobj:any){
  let httpHeaders=new HttpHeaders({
    'Content-Type' : 'application/json', 
    'Authorization' : 'Bearer '+localStorage.getItem('jwttoken')
  });
  let requestOption:any= {headers:httpHeaders}
 return this.http.post("http://localhost:5555/movie/api/v1/favList/addMovie/"+`${localStorage.getItem('formdata')}`+`/${localStorage.getItem('user')}`,favobj,requestOption);
}

getMovieFromFavourite()
  {
    let httpHeaders=new HttpHeaders({
      'Content-Type' : 'application/json', 
      'Authorization' : 'Bearer '+localStorage.getItem('jwttoken')
    });
    let requestOption:any= {headers:httpHeaders}
    return this.http.get(this.base_url+"favList/get/"+`${localStorage.getItem('formdata')}`+`/${localStorage.getItem('user')}`,requestOption)
  }



  deletefromfavlist(movieId:any)
{
  let httpHeaders=new HttpHeaders({
    'Content-Type' : 'application/json', 
    'Authorization' : 'Bearer '+localStorage.getItem('jwttoken')
  });
  let requestOption:any= {headers:httpHeaders}
  return this.http.delete(this.base_url+"favList/deleteMovie/"+`${localStorage.getItem('formdata')}`+"/"+`${localStorage.getItem('user')}/`+movieId,requestOption)
}
}
