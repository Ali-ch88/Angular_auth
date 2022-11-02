import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  constructor(private http:HttpClient) { }
  getShows(data:{query:string}):Observable<any>{
    return this.http.get(`/api/search?search=${data.query}`,{withCredentials:true})
  }
}
