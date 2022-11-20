import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { FutureMoneyService } from 'src/app/services/future-money.service';
import { UserService } from 'src/app/services/user.service';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;
@Component({
  selector: 'app-future-money-transactions-view',
  templateUrl: './future-money-transactions-view.component.html',
  styleUrls: ['./future-money-transactions-view.component.scss'],
})
export class FutureMoneyTransactionsViewComponent implements OnInit {
  users: User[] = [];
  userStatus: boolean = true;
  futureMoneyForm: FormGroup;
  dateNow: FormControl;
  para: FormControl;
  dateInput: any;
  actionBtnName: string;
  dialogTitle: string;
  status: boolean = true;
  answer: number = 0;

  constructor(
    private userService: UserService,
    private futureMoneyService: FutureMoneyService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FutureMoneyTransactionsViewComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUserByStatus();
    if (this.data.status) {
      this.dateNow = new FormControl(
        moment().format('YYYY-MM-DD'),
        Validators.required
      );
      this.dateInput = this.dateNow.value;
      this.actionBtnName = 'Kaydet';
      this.dialogTitle = 'Elden Gelecek Ekle';
    } else if (!this.data.status) {
      this.dateNow = new FormControl(
        this.data.row.futureMoneyRegistrationDate,
        Validators.required
      );
      this.dateInput = this.data.row.futureMoneyRegistrationDate;
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Elden Gelecek Güncelle';
    }
    this.getForms();
  }

  getAllUserByStatus() {
    this.userService
      .getAllUserByStatus(this.userStatus)
      .subscribe((response) => {
        this.users = response.data;
      });
  }

  getForms() {
    this.createFutureMoneyForm();
    if (!this.data.status) {
      this.editFutureMoneyForm();
    }
  }


  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.getForms();
  }

  createFutureMoneyForm() {
    if (this.data.status) {
      this.futureMoneyForm = this.formBuilder.group({
        userId: ['',Validators.required],
        typeOfOperation: ['', Validators.required],
        customerCode: ['', Validators.required],
        customerNameSurname: ['', Validators.required],
        promissoryNumber: ['', Validators.required],
        transactionAmount: ['', Validators.required],
        amountPaid: ['', Validators.required],
        futureAmount: [''],
        futureMoneyRegistrationDate: [this.dateInput, Validators.required],
        description: [''],
        status: [this.status],
      });
    } else if (!this.data.status) {
      this.futureMoneyForm = this.formBuilder.group({
        futureMoneyId: [this.data.row.futureMoneyId],
        userId: ['',Validators.required],
        typeOfOperation: ['', Validators.required],
        customerCode: ['', Validators.required],
        customerNameSurname: ['', Validators.required],
        promissoryNumber: ['', Validators.required],
        transactionAmount: ['', Validators.required],
        amountPaid: ['', Validators.required],
        futureAmount: [''],
        futureMoneyRegistrationDate: [this.dateInput, Validators.required],
        description: [''],
        status: [this.data.row.status],
      });
    }
  }

  editFutureMoneyForm() {
    this.futureMoneyForm.controls['userId'].setValue(
      this.data.row.userId
    );
    this.futureMoneyForm.controls['typeOfOperation'].setValue(
      this.data.row.typeOfOperation
    );
    this.futureMoneyForm.controls['customerCode'].setValue(
      this.data.row.customerCode
    );
    this.futureMoneyForm.controls['customerNameSurname'].setValue(
      this.data.row.customerNameSurname
    );
    this.futureMoneyForm.controls['promissoryNumber'].setValue(
      this.data.row.promissoryNumber
    );
    this.futureMoneyForm.controls['transactionAmount'].setValue(
      this.data.row.transactionAmount
    );
    this.futureMoneyForm.controls['amountPaid'].setValue(
      this.data.row.amountPaid
    );
    this.futureMoneyForm.controls['futureAmount'].setValue(
      this.data.row.futureAmount
    );
    this.futureMoneyForm.controls['description'].setValue(
      this.data.row.description
    );
  }

  control() {
    let futureMoneyModel = Object.assign({}, this.futureMoneyForm.value);

    if (futureMoneyModel.transactionAmount == futureMoneyModel.amountPaid) {
      this.toastrService.error(
        'İşlem Tutarı İle Ödenen Tutar Aynı Olamaz ',
        'Dikkat'
      );
    } else if (
      futureMoneyModel.transactionAmount <= futureMoneyModel.amountPaid
    ) {
      this.toastrService.error(
        'Ödenen Tutar İşlem Tutarından Büyük Olamaz ',
        'Dikkat'
      );
    } else {
      this.answer =
        futureMoneyModel.transactionAmount - futureMoneyModel.amountPaid;
        this.futureMoneyForm.controls['futureAmount'].setValue(
          this.answer
         );
         this.add();
    }
  }


  add() {
    debugger
    if (this.data.status) {
      if (this.futureMoneyForm.valid) {
        let futureMoneyModel = Object.assign({}, this.futureMoneyForm.value);
        this.futureMoneyService.add(futureMoneyModel).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            this.futureMoneyForm.reset();
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
        this.toastrService.error(
          'Lütfen Tüm Zorunlu Alanları Doldurun',
          'Dikkat'
        );
      }
    } else if (!this.data.status) {
      this.update();
    }
  }

  update() {
    if (this.futureMoneyForm.valid) {
      let futureMoneyModel = Object.assign({}, this.futureMoneyForm.value);
      this.futureMoneyService.update(futureMoneyModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.futureMoneyForm.reset();
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
