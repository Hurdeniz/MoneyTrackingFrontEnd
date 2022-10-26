export interface FutureMoney {
  futureMoneyId:number;
  userId:number;
  typeOfOperation:string;
  customerCode:string;
  promissoryNoteNumber:string;
  transactionAmount:number;
  amountPaid:number;
  futureAmount:number;
  futureMoneyRegistrationDate:string;
  description:string;
  status:boolean;
}
