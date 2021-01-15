import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from '../constants/url';

@Injectable({
  providedIn: 'root'
})
export class ListCharactersService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  getCharacters(page: number){
    return this.http.get<any>(`${apiUrl}/character?page=${page}`, this.httpOptions);
  }

  getCharacter(id: number){
    return this.http.get<any>(`${apiUrl}/character/${id}`, this.httpOptions);
  }

  getMultipleCharacters(ids: string){
    return this.http.get<any>(`${apiUrl}/character/${ids}`, this.httpOptions);
  }

  // nextPage(nextUrl: string){
  //   return this.http.get<any>(`${nextUrl}`, this.httpOptions);
  // }

  // prevPage(prevUrl: string){
  //   return this.http.get<any>(`${prevUrl}`, this.httpOptions);
  // }
}
