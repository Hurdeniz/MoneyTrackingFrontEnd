import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BankService } from 'src/app/services/bank.service';

@Component({
  selector: 'app-bank-view',
  templateUrl: './bank-view.component.html',
  styleUrls: ['./bank-view.component.scss'],
})
export class BankViewComponent {
  bankForm: FormGroup;
  actionBtnName: string;
  dialogTitle: string;

  constructor(
    private bankService: BankService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BankViewComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {

    this.actionBtnName = 'Kaydet';
    this.dialogTitle = 'Banka Ekle';
    this.createBankForm();

    if (!this.data.status) {
      this.editBankForm();
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Banka Güncelle';
    }
  }

  createBankForm() {
    if (this.data.status) {
      this.bankForm = this.formBuilder.group({
        bankName: ['', Validators.required],
      });
    } else if (!this.data.status) {
      this.bankForm = this.formBuilder.group({
        bankId: [this.data.row.bankId],
        bankName: ['', Validators.required],
      });
    }
  }

  editBankForm() {
    this.bankForm.controls['bankName'].setValue(this.data.row.bankName);
  }

  statusControl() {
    if (this.data.status) {
      this.add();
    } else if (!this.data.status) {
      this.update();
    }
  }

  add() {
    if (this.bankForm.valid) {
      let bankModel = Object.assign({}, this.bankForm.value);
      this.bankService.add(bankModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.bankForm.reset();
          this.dialogRef.close('save');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors == undefined) {
            this.toastrService.error(responseError.error, 'Dikkat');
          } else {
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
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }

  update() {
    if (this.bankForm.valid) {
      let bankModel = Object.assign({}, this.bankForm.value);
      this.bankService.update(bankModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.bankForm.reset();
          this.dialogRef.close('update');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors == undefined) {
            this.toastrService.error(responseError.error, 'Dikkat');
          } else {
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
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }
}
