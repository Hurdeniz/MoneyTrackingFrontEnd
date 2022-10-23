import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Bank } from 'src/app/models/bank';
import { BankService } from 'src/app/services/bank.service';
import { CardPaymentService } from 'src/app/services/card-payment.service';

@Component({
  selector: 'app-card-payment-view',
  templateUrl: './card-payment-view.component.html',
  styleUrls: ['./card-payment-view.component.scss']
})
export class CardPaymentViewComponent implements OnInit {
  banks: Bank[] = [];
  cardForm: FormGroup;
  actionBtnName = 'Kaydet';
  dialogTitle = 'Kredi Kartı Ekle';

  constructor(
    private bankService: BankService,
    private cardPaymentService: CardPaymentService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<CardPaymentViewComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getBanks();
    this.createCardForm();


    if (this.editData) {
      this.editCardForm();
    }
  }

  getBanks() {
    this.bankService.getBanks().subscribe((response) => {
      this.banks = response.data;
    });
  }

  createCardForm() {
    if (!this.editData) {
      this.cardForm = this.formBuilder.group({
        userId: ['1'],
        bankId: ['', Validators.required],
        amount: ['', Validators.required],
        date:['',Validators.required],
        description: [''],
      });
    } else {
      this.cardForm = this.formBuilder.group({
        cardPaymentId: [this.editData.cardPaymentId],
        userId: [this.editData.userId],
        bankId: ['', Validators.required],
        amount: ['', Validators.required],
        date: ['',Validators.required],
        description: [''],
      });
    }
  }

  editCardForm() {
    this.actionBtnName = 'Güncelle';
    this.dialogTitle = 'Kredi Kartı Güncelle';
    this.cardForm.controls['bankId'].setValue(this.editData.bankId);
    this.cardForm.controls['amount'].setValue(this.editData.amount);
    this.cardForm.controls['date'].setValue(this.editData.date);
    this.cardForm.controls['description'].setValue(this.editData.description);
  }

  add() {

    if (!this.editData) {
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
    }
    else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }


}
