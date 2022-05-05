import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl : string = "http://localhost:3000/";
  constructor(private http : HttpClient) { }
  postPatAttente(data:any){
    return this.http.post<any>(this.baseUrl+"salleAttente",data);
  }
  getAllPatAttente(){
    return this.http.get<any>(this.baseUrl+"salleAttente");
  }
  getPatEnAttente(){
    return this.http.get<any>(this.baseUrl+"salleAttente?servi=false");
  }
  putPatEnAttente(data : any, id : number){
    return this.http.put<any>(this.baseUrl+"salleAttente/"+id, data);
  }
  deletePatEnAttente(id : number){
    return this.http.delete<any>(this.baseUrl+"salleAttente/"+id);
  }
} 
