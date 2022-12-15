import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyGroupByCustomerDto } from 'src/app/models/Dtos/futureMoneyGroupByCustomerNameDto';
import { IncomingMoneyGroupByCustomerDto } from 'src/app/models/Dtos/incomingMoneyGroupByCustomerDto';
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
  date: string;
  totalMoneyOutputAmount: number;
  turnover: number;
  totalFutureMoneyAmount: number;
  totalIncomingMoneyAmount: number;
  totalSafeBox: number;

  futureMoneyStatus: boolean = false;
  incomingMoneyStatus: boolean = false;


  constructor(
    private futureMoneyService: FutureMoneyService,
    private incomingMoneyService:IncomingMoneyService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastrService
  ) { }


  ngOnInit(): void {
    if (this.data.getSums.totalFutureMoneyAmount > 0 && this.data.getSums.totalIncomingMoneyAmount > 0) {
      this.futureMoneyStatus = true;
      this.incomingMoneyStatus = true;
    }
    else if (this.data.getSums.totalFutureMoneyAmount > 0) {
      this.futureMoneyStatus = true;
    }
    else if (this.data.getSums.totalIncomingMoneyAmount > 0) {
      this.incomingMoneyStatus = true;
    }


    this.date = this.data.date;
    this.totalMoneyOutputAmount = this.data.getSums.totalMoneyOutputAmount;
    this.turnover = this.data.getSums.turnover;
    this.totalFutureMoneyAmount = this.data.getSums.totalFutureMoneyAmount;
    this.totalIncomingMoneyAmount = this.data.getSums.totalIncomingMoneyAmount;
    this.totalSafeBox = this.data.totalSafeBox;

    this.getAllFutureMoneyByDateGroupByCustomer();
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
