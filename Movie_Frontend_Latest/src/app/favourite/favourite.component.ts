import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FavlistService } from '../service/favlist.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit{
  constructor(private favSer:FavlistService){}
  favmovies:any=[];
  ngOnInit(): void {
    this.favSer.getMovieFromFavourite().subscribe(data=>{
      this.favmovies=data;
      console.log(data)
    })
  }
  delete(id:any){
    console.log(id);
    this.favSer.deletefromfavlist(id).subscribe(data=>{
     Swal.fire('Sure','You want to delete','question');
      this.ngOnInit();
    })
    
  }

}
