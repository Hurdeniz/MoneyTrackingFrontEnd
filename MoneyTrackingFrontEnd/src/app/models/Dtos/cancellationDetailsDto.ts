export interface CancellationDetailsDto {
  cancellationId:number;
  userId:number;
  userNameSurname:string;
  customerCode:string;
  customerNameSurname:string;
  promissoryNumber:string;
  transactionAmount:number;
  cancellationAmount:number;
  date:Date;
  description:string;
}
