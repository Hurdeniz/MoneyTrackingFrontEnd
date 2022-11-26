export interface IncomingMoneyDetailsDto {
  incomingMoneyId:number;
  futureMoneyId:number;
  typeOfOperation:string;
  customerCode:string;
  customerNameSurname:string;
  promissoryNumber:string;
  transactionAmount:number;
  futureMoneyRegistrationDate:Date;
  incomingMoneyRegistrationDate:Date;
  incomingAmount:number;
  description:string;
}
