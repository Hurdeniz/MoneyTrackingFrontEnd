import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShipmentListDetailsDto } from '../models/Dtos/shipmentListDetailsDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { ShipmentList } from '../models/shipmentList';

@Injectable({
  providedIn: 'root'
})
export class ShipmentListService {

  constructor(
  @Inject('apiUrl') private apiUrl:string,
  private httpClient: HttpClient) { }

  getAllShipmentListDetail(): Observable<ListResponseModel<ShipmentListDetailsDto>> {
    let newPath = this.apiUrl + 'ShipmentList/GetAllShipmentListDetail';
    return this.httpClient.get<ListResponseModel<ShipmentListDetailsDto>>(newPath);
  }

  add(shipmentList: ShipmentList):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'ShipmentList/Add',shipmentList)
  }

  update(shipmentList: ShipmentList):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'ShipmentList/Update',shipmentList)
  }

  delete(shipmentList: ShipmentList):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'ShipmentList/Delete',shipmentList)
  }
}
