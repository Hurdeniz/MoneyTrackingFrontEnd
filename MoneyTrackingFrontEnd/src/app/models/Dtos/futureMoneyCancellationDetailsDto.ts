export interface FutureMoneyCancellationDetailsDto {
  futureMoneyCancellationId:number;
  futureMoneyId:number;
  userId:number;
  futureMoneyCancellationAmount:number;
  futureMoneyCancellationRegistrationDate:Date;
  futureMoneyCancellationDescription:string;
  typeOfOperation:string;
  customerCode:string;
  customerNameSurname:string;
  promissoryNumber:string;
  transactionAmount:number;
  amountPaid:number;
  futureAmount:number;
  futureMoneyRegistrationDate:Date;
  futureMoneyDescription:string;
  futureMoneyStatus:boolean;
}
