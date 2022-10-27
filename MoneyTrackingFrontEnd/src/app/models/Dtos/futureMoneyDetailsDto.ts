export interface FutureMoneyDetailsDto {
  futureMoneyId:number;
  userId:number;
  userName:string;
  typeOfOperation:string;
  customerCode:string;
  customerName:string;
  promissoryNoteNumber:string;
  transactionAmount:number;
  amountPaid:number;
  futureAmount:number;
  futureMoneyRegistrationDate:string;
  description:string;
  status:boolean;
}
