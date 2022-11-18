export interface FutureMoney {
  futureMoneyId:number;
  userId:number;
  typeOfOperation:string;
  customerCode:string;
  customerNameSurname:string;
  promissoryNumber:string;
  transactionAmount:number;
  amountPaid:number;
  futureAmount:number;
  futureMoneyRegistrationDate:Date;
  description:string;
  status:boolean;
}
