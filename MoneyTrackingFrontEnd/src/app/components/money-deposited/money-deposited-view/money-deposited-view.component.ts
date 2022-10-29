import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Bank } from 'src/app/models/bank';
import { BankService } from 'src/app/services/bank.service';
import { MoneyDepositedService } from 'src/app/services/money-deposited.service';

@Component({
  selector: 'app-money-deposited-view',
  templateUrl: './money-deposited-view.component.html',
  styleUrls: ['./money-deposited-view.component.scss']
})
export class MoneyDepositedViewComponent implements OnInit {
  banks: Bank[] = [];
  moneyDepositedForm: FormGroup;
  actionBtnName = 'Kaydet';
  dialogTitle = 'Para Yatırma Ekle';

  constructor(
    private moneyDepositedService:MoneyDepositedService,
    private bankService: BankService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<MoneyDepositedViewComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllBanks();
    this.createMoneyDepositedForm();
    if (this.editData) {
      this.editMoneyDepositedForm();
    }
  }

  getAllBanks() {
    this.bankService.getAll().subscribe((response) => {
      this.banks = response.data;
    });
  }

  createMoneyDepositedForm() {
    if (!this.editData) {
      this.moneyDepositedForm = this.formBuilder.group({
        bankId: ['', Validators.required],
        amount: ['', Validators.required],
        date:['',Validators.required],
        description: [''],
      });
    } else {
      this.moneyDepositedForm = this.formBuilder.group({
        moneyDepositedId: [this.editData.moneyDepositedId],
        bankId: ['', Validators.required],
        amount: ['', Validators.required],
        date: ['',Validators.required],
        description: [''],
      });
    }
  }


  editMoneyDepositedForm() {
    this.actionBtnName = 'Güncelle';
    this.dialogTitle = 'Para Yatırma Güncelle';
    this.moneyDepositedForm.controls['bankId'].setValue(this.editData.bankId);
    this.moneyDepositedForm.controls['amount'].setValue(this.editData.amount);
    this.moneyDepositedForm.controls['date'].setValue(this.editData.date);
    this.moneyDepositedForm.controls['description'].setValue(this.editData.description);
  }


  add() {

    if (!this.editData) {
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
    } else {
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
