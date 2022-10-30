import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { StaffEpisode } from '../models/staffEpisode';

@Injectable({
  providedIn: 'root'
})
export class StaffEpisodeService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<ListResponseModel<StaffEpisode>> {
    let newPath = this.apiUrl + 'StaffEpisode/GetAll';
    return this.httpClient.get<ListResponseModel<StaffEpisode>>(newPath);
  }
}
