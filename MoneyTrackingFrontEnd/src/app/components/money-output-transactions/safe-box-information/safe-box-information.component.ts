import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyCancellationGroupByCustomerDto } from 'src/app/models/Dtos/FutureMoneyCancellationGroupByCustomerDto';
import { FutureMoneyGroupByCustomerDto } from 'src/app/models/Dtos/futureMoneyGroupByCustomerNameDto';
import { IncomingMoneyGroupByCustomerDto } from 'src/app/models/Dtos/incomingMoneyGroupByCustomerDto';
import { FutureMoneyCancellationService } from 'src/app/services/future-money-cancellation.service';
import { FutureMoneyService } from 'src/app/services/future-money.service';
import { IncomingMoneyService } from 'src/app/services/incoming-money.service';

@Component({
  selector: 'app-safe-box-information',
  templateUrl: './safe-box-information.component.html',
  styleUrls: ['./safe-box-information.component.scss']
})
export class SafeBoxInformationComponent {
  futureMoneyGroupByCustomerDto: FutureMoneyGroupByCustomerDto[] = [];
  incomingMoneyGroupByCustomerDto: IncomingMoneyGroupByCustomerDto[] = [];
  futureMoneyCancellationGroupByCustomerDto: FutureMoneyCancellationGroupByCustomerDto[] = [];
  date: string;
  totalMoneyOutputAmount: number;
  turnover: number;
  totalFutureMoneyAmount: number;
  totalFutureMoneyCancellationAmount: number;
  totalIncomingMoneyAmount: number;
  totalSafeBox: number;
  futureMoneyStatus: boolean = false;
  futureMoneyCancellationStatus: boolean = false;
  incomingMoneyStatus: boolean = false;


  constructor(
    private futureMoneyService: FutureMoneyService,
    private futureMoneyCancellationService : FutureMoneyCancellationService,
    private incomingMoneyService:IncomingMoneyService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastrService
  ) { }


  ngOnInit(): void {
    if (this.data.getSums.totalFutureMoneyAmount > 0 && this.data.getSums.totalIncomingMoneyAmount > 0 && this.data.getSums.totalFutureMoneyCancellationAmount > 0) {
      this.futureMoneyStatus = true;
      this.incomingMoneyStatus = true;
      this.futureMoneyCancellationStatus=true;
    }
    else if (this.data.getSums.totalFutureMoneyAmount > 0) {
      this.futureMoneyStatus = true;
    }
    else if (this.data.getSums.totalIncomingMoneyAmount > 0) {
      this.incomingMoneyStatus = true;
    }
    else if (this.data.getSums.totalFutureMoneyCancellationAmount > 0) {
      this.futureMoneyCancellationStatus = true;
    }



    this.date = this.data.date;
    this.totalMoneyOutputAmount = this.data.getSums.totalMoneyOutputAmount;
    this.turnover = this.data.getSums.turnover;
    this.totalFutureMoneyAmount = this.data.getSums.totalFutureMoneyAmount;
    this.totalIncomingMoneyAmount = this.data.getSums.totalIncomingMoneyAmount;
    this.totalFutureMoneyCancellationAmount=this.data.getSums.totalFutureMoneyCancellationAmount;
    this.totalSafeBox = this.data.totalSafeBox;

    this.getAllFutureMoneyByDateGroupByCustomer();
    this.getAllFutureMoneyCancellationByDateGroupByCustomer();
    this.getAllIncomingMoneyByDateGroupByCustomer();
  }

  getAllFutureMoneyByDateGroupByCustomer() {
    this.futureMoneyService
      .getAllFutureMoneyByDateGroupByCustomer(this.date)
      .subscribe(
        (response) => {
          this.futureMoneyGroupByCustomerDto = response.data;
        },
        (responseError) => {
          this.toastrService.error(responseError.data.message, 'Dikkat');
        }
      );
  }

  getAllFutureMoneyCancellationByDateGroupByCustomer() {
    this.futureMoneyCancellationService
      .getAllFutureMoneyCancellationByDateGroupByCustomer(this.date)
      .subscribe(
        (response) => {
          this.futureMoneyCancellationGroupByCustomerDto = response.data;
        },
        (responseError) => {
          this.toastrService.error(responseError.data.message, 'Dikkat');
        }
      );
  }


  getAllIncomingMoneyByDateGroupByCustomer() {
    this.incomingMoneyService
      .getAllIncomingMoneyByDateGroupByCustomer(this.date)
      .subscribe(
        (response) => {
          this.incomingMoneyGroupByCustomerDto = response.data;
        },
        (responseError) => {
          this.toastrService.error(responseError.data.message, 'Dikkat');
        }
      );
  }



}
