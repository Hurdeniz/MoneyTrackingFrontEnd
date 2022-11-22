export interface ShipmentListDetailsDto {
  shipmentListId:number;
  shipmentNumber:number;
  userId:number;
  userNameSurname:string;
  customerCode:string;
  customerNameSurname:string;
  promissoryNumber:string;
  adress:string;
  date:Date;
  status:boolean;
  result:string;
}
