import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerPayService } from 'src/app/services/customer-pay.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-customer-pay-view',
  templateUrl: './customer-pay-view.component.html',
  styleUrls: ['./customer-pay-view.component.scss'],
})
export class CustomerPayViewComponent implements OnInit {
  customerPayForm: FormGroup;
  dateNow: FormControl;
  dateInput: any;
  actionBtnName: string;
  dialogTitle: string;

  constructor(
    private customerPayService: CustomerPayService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CustomerPayViewComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.data.status) {
      this.dateNow = new FormControl(
        moment().format('YYYY-MM-DD'),
        Validators.required
      );
      this.dateInput = this.dateNow.value;
      this.actionBtnName = 'Kaydet';
      this.dialogTitle = 'Firma Ödemesi Ekle';
    } else if (!this.data.status) {
      this.dateNow = new FormControl(this.data.row.date, Validators.required);
      this.dateInput = this.data.row.date;
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Firma Ödemesi Güncelle';
    }
    this.getForms();
  }

  getForms() {
    this.createCustomerPayForm();
    if (!this.data.status) {
      this.editCustomerPayForm();
    }
  }
  addEvent(event: any) {
    let a: Moment = event.value;
    this.dateInput = a.format('YYYY-MM-DD');
    this.customerPayForm.controls['date'].setValue(this.dateInput);
  }

  createCustomerPayForm() {
    if (this.data.status) {
      this.customerPayForm = this.formBuilder.group({
        customerName: ['', Validators.required],
        amount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    } else if (!this.data.status) {
      this.customerPayForm = this.formBuilder.group({
        customerPayId: [this.data.row.customerPayId],
        customerName: ['', Validators.required],
        amount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    }
  }

  editCustomerPayForm() {
    this.customerPayForm.controls['customerName'].setValue(
      this.data.row.customerName
    );
    this.customerPayForm.controls['amount'].setValue(this.data.row.amount);
    this.customerPayForm.controls['description'].setValue(
      this.data.row.description
    );
  }

  statusControl() {
    if (this.data.status) {
      this.add();
    } else if (!this.data.status) {
      this.update();
    }
  }

  add() {
    if (this.customerPayForm.valid) {
      let customerPayModel = Object.assign({}, this.customerPayForm.value);
      this.customerPayService.add(customerPayModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.customerPayForm.reset();
          this.dialogRef.close('save');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }

  update() {
    if (this.customerPayForm.valid) {
      let customerPayModel = Object.assign({}, this.customerPayForm.value);
      this.customerPayService.update(customerPayModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.customerPayForm.reset();
          this.dialogRef.close('update');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }
}
