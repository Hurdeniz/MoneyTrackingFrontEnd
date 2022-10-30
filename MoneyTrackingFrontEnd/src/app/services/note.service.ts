import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Note } from '../models/note';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
  @Inject('apiUrl') private apiUrl:string,
  private httpClient: HttpClient) { }

  getAllByUser(userId:number): Observable<ListResponseModel<Note>> {
    let newPath = this.apiUrl + 'Note/GetAllByUser?userId='+userId;
    return this.httpClient.get<ListResponseModel<Note>>(newPath);
  }

  add(note: Note):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Note/Add',note)
  }

  update(note: Note):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Note/Update',note)
  }

  delete(note: Note):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Note/Delete',note)
  }
}
