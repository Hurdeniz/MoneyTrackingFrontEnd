import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Bank } from 'src/app/models/bank';
import { BankService } from 'src/app/services/bank.service';
import { CardPaymentService } from 'src/app/services/card-payment.service';
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
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<CardPaymentViewComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllBanks();

    if (this.editData.status) {
      this.dateNow = new FormControl(
        moment().format('YYYY-MM-DD'),
        Validators.required
      );
      this.dateInput = this.dateNow.value;
      this.actionBtnName = 'Kaydet';
      this.dialogTitle = 'Kredi Kartı Ekle';
    } else if (!this.editData.status) {
      this.dateNow = new FormControl(
        this.editData.data.date,
        Validators.required
      );
      this.dateInput = this.editData.data.date;
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
    if (!this.editData.status) {
      this.editCardForm();
    }
  }

  addEvent(event: any) {
    let a: Moment = event.value;
    this.dateInput = a.format('YYYY-MM-DD');
    this.getForms();
  }

  createCardForm() {
    if (this.editData.status) {
      this.cardForm = this.formBuilder.group({
        userId: [this.editData.userId],
        bankId: ['', Validators.required],
        amount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    } else if (!this.editData.status) {
      this.cardForm = this.formBuilder.group({
        cardPaymentId: [this.editData.data.cardPaymentId],
        userId: [this.editData.data.userId],
        bankId: ['', Validators.required],
        amount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    }
  }

  editCardForm() {
    this.cardForm.controls['bankId'].setValue(this.editData.data.bankId);
    this.cardForm.controls['amount'].setValue(this.editData.data.amount);
    this.cardForm.controls['description'].setValue(this.editData.data.description);
  }

  add() {
    if (this.editData.status) {
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
    } else if (!this.editData.status) {
      this.update();
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
