import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CardPaymentGroupByBankNameDto } from 'src/app/models/Dtos/cardPaymentGroupByBankNameDto';
import { CardPaymentService } from 'src/app/services/card-payment.service';

@Component({
  selector: 'app-card-payment-information',
  templateUrl: './card-payment-information.component.html',
  styleUrls: ['./card-payment-information.component.scss']
})
export class CardPaymentInformationComponent {
  cardPaymentGroupByBankNameDto : CardPaymentGroupByBankNameDto[]=[];
  constructor(
    private cardPaymentService:CardPaymentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastrService

  ) { }

  ngOnInit(): void {
    this.getAllCardPaymentsByDateGroupByBankName();
  }

  getTotalAmount() {
    return this.cardPaymentGroupByBankNameDto.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }


  getAllCardPaymentsByDateGroupByBankName() {
    this.cardPaymentService
      .getAllCardPaymentsByDateGroupByBankName(this.data)
      .subscribe(
        (response) => {
          this.cardPaymentGroupByBankNameDto = response.data;
        },
        (responseError) => {
          this.toastrService.error(responseError.data.message, 'Dikkat');
        }
      );
  }


}
