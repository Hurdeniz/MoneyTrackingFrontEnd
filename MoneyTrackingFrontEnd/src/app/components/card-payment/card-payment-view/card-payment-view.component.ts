import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Bank } from 'src/app/models/bank';
import { BankService } from 'src/app/services/bank.service';
import { CardPaymentService } from 'src/app/services/card-payment.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-card-payment-view',
  templateUrl: './card-payment-view.component.html',
  styleUrls: ['./card-payment-view.component.scss'],
})
export class CardPaymentViewComponent implements OnInit {
  banks: Bank[] = [];
  dateNow: FormControl;
  cardForm: FormGroup;
  dateInput: any;
  actionBtnName: string;
  dialogTitle: string;

  constructor(
    private bankService: BankService,
    private cardPaymentService: CardPaymentService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CardPaymentViewComponent>
  ) {}

  ngOnInit(): void {

    this.getAllBanks();

    if (this.data.status) {
      this.dateNow = new FormControl(
        moment().format('YYYY-MM-DD'),
        Validators.required
      );
      this.dateInput = this.dateNow.value;
      this.actionBtnName = 'Kaydet';
      this.dialogTitle = 'Kredi Kartı Ekle';
    } else if (!this.data.status) {
      this.dateNow = new FormControl(
        this.data.row.date,
        Validators.required
      );
      this.dateInput = this.data.row.date;
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Kredi Kartı Güncelle';
    }
    this.getForms();
  }

  getAllBanks() {
    this.bankService.getAll().subscribe((response) => {
      this.banks = response.data;
    });
  }

  getForms() {
    this.createCardForm();
    if (!this.data.status) {
      this.editCardForm();
    }
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.cardForm.controls['date'].setValue(this.dateInput);
  }
  createCardForm() {
    if (this.data.status) {
      this.cardForm = this.formBuilder.group({
        userId: [this.data.userId],
        bankId: ['', Validators.required],
        amount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    } else if (!this.data.status) {
      this.cardForm = this.formBuilder.group({
        cardPaymentId: [this.data.row.cardPaymentId],
        userId: [this.data.row.userId],
        bankId: ['', Validators.required],
        amount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    }
  }
  editCardForm() {
    this.cardForm.controls['bankId'].setValue(this.data.row.bankId);
    this.cardForm.controls['amount'].setValue(this.data.row.amount);
    this.cardForm.controls['description'].setValue(this.data.row.description);
  }

  statusControl() {
    if (this.data.status) {
      this.add();
    } else if (!this.data.status) {
      this.update();
    }
  }

  add() {
      if (this.cardForm.valid) {
        let cardPaymentModel = Object.assign({}, this.cardForm.value);
        this.cardPaymentService.add(cardPaymentModel).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            this.cardForm.reset();
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
    if (this.cardForm.valid) {
      let cardPaymentModel = Object.assign({}, this.cardForm.value);
      this.cardPaymentService.update(cardPaymentModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.cardForm.reset();
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
