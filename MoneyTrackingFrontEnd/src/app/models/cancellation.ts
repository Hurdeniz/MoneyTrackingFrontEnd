export interface Cancellation {
  cancellationId:number;
  userId:number;
  customerCode:string;
  customerNameSurname:string;
  promissoryNumber:string;
  transactionAmount:number;
  cancellationAmount:number;
  date:Date;
  description:string;
}
