export interface FutureMoneyDetailsDto {
  futureMoneyId:number;
  userId:number;
  userName:string;
  typeOfOperation:string;
  customerCode:string;
  customerNameSurname:string;
  promissoryNumber:string;
  transactionAmount:number;
  amountPaid:number;
  futureAmount:number;
  futureMoneyRegistrationDate:string;
  description:string;
  status:boolean;
}
