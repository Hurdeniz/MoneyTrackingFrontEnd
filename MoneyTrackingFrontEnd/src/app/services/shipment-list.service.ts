import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Count } from '../models/Dtos/count';
import { ShipmentListDetailsDto } from '../models/Dtos/shipmentListDetailsDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { ShipmentList } from '../models/shipmentList';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ShipmentListService {

  constructor(
  @Inject('apiUrl') private apiUrl:string,
  private httpClient: HttpClient) { }

  getAllShipmentListDetailByStatusAndDate(status:boolean , startDate:string , endDate:string): Observable<ListResponseModel<ShipmentListDetailsDto>> {
    let newPath = this.apiUrl + 'ShipmentList/GetAllShipmentListDetailByStatusAndDate?status='+status+'&startDate='+startDate+'&endDate='+endDate;
    return this.httpClient.get<ListResponseModel<ShipmentListDetailsDto>>(newPath);
  }

  getCountByDate(date:string , status:boolean): Observable<SingleResponseModel<Count>> {
    let newPath = this.apiUrl + 'ShipmentList/GetCountByDate?date='+date+'&status='+status;
    return this.httpClient.get<SingleResponseModel<Count>>(newPath);
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
