import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  constructor(private hhtp: HttpClient) { }

  getCharacters(params:any){
    return this.hhtp.get(environment.baseUrl + environment.character,{params})
  }

  getCharactersById(id:string){
    return this.hhtp.get(environment.baseUrl + environment.character+id)
  }

  getByUrl(url:string){
    return this.hhtp.get(url);
  }

}
