import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { Bank } from 'src/app/models/bank';
import { BankService } from 'src/app/services/bank.service';
import { MoneyDepositedService } from 'src/app/services/money-deposited.service';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-money-deposited-view',
  templateUrl: './money-deposited-view.component.html',
  styleUrls: ['./money-deposited-view.component.scss']
})
export class MoneyDepositedViewComponent implements OnInit {
  banks: Bank[] = [];
  moneyDepositedForm: FormGroup;
  dateNow: FormControl;
  dateInput: any;
  actionBtnName: string;
  dialogTitle: string;

  constructor(
    private moneyDepositedService:MoneyDepositedService,
    private bankService: BankService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MoneyDepositedViewComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllBanks();

    if (this.data.status) {
      this.dateNow = new FormControl(
        moment().format('YYYY-MM-DD'),
        Validators.required
      );
      this.dateInput = this.dateNow.value;
      this.actionBtnName = 'Kaydet';
      this.dialogTitle = 'Para Yatırma Ekle';
    } else if (!this.data.status) {
      this.dateNow = new FormControl(
        this.data.row.date,
        Validators.required
      );
      this.dateInput = this.data.row.date;
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Para Yatırma Güncelle';
    }
    this.getForms();
  }

  getAllBanks() {
    this.bankService.getAll().subscribe((response) => {
      this.banks = response.data;
    });
  }

  getForms() {
    this.createMoneyDepositedForm();
    if (!this.data.status) {
      this.editMoneyDepositedForm();
    }
  }

  addEvent(event: any) {
    let a: Moment = event.value;
    this.dateInput = a.format('YYYY-MM-DD');
    this.getForms();
  }


  createMoneyDepositedForm() {
    if (this.data.status) {
      this.moneyDepositedForm = this.formBuilder.group({
        bankId: ['', Validators.required],
        amount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    } else if (!this.data.status) {
      this.moneyDepositedForm = this.formBuilder.group({
        moneyDepositedId: [this.data.row.moneyDepositedId],
        bankId: ['', Validators.required],
        amount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    }
  }


  editMoneyDepositedForm() {
    this.moneyDepositedForm.controls['bankId'].setValue(this.data.row.bankId);
    this.moneyDepositedForm.controls['amount'].setValue(this.data.row.amount);
    this.moneyDepositedForm.controls['description'].setValue(this.data.row.description);
  }


  add() {
    if (this.data.status)  {
      if (this.moneyDepositedForm.valid) {
        let moneyDepositedModel = Object.assign({}, this.moneyDepositedForm.value);
        this.moneyDepositedService.add(moneyDepositedModel).subscribe(
          (response) => {

            this.toastrService.success(response.message, 'Başarılı');
            this.moneyDepositedForm.reset();
            this.dialogRef.close('save');
          },
          (responseError) => {
            if (responseError.error.ValidationErrors.length > 0) {
              for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
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
    } else if (!this.data.status) {
      this.update();
    }
  }


  update() {
    if (this.moneyDepositedForm.valid) {
      let moneyDepositedModel = Object.assign({}, this.moneyDepositedForm.value);
      this.moneyDepositedService.update(moneyDepositedModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.moneyDepositedForm.reset();
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
    }
    else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }



}
