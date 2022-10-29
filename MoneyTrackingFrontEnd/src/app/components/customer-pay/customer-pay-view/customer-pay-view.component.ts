import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomerPayService } from 'src/app/services/customer-pay.service';

@Component({
  selector: 'app-customer-pay-view',
  templateUrl: './customer-pay-view.component.html',
  styleUrls: ['./customer-pay-view.component.scss']
})
export class CustomerPayViewComponent implements OnInit {
  customerPayForm: FormGroup;
  actionBtnName = 'Kaydet';
  dialogTitle = 'Firma Ödemesi Ekle';

  constructor(
    private customerPayService: CustomerPayService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<CustomerPayViewComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createCustomerPayForm();
    if (this.editData) {
      this.editCustomerPayForm();
    }
  }

  createCustomerPayForm() {
    if (!this.editData) {
      this.customerPayForm = this.formBuilder.group({
        customerName: ['', Validators.required],
        amount: ['', Validators.required],
        date:['',Validators.required],
        description: [''],
      });
    } else {
      this.customerPayForm = this.formBuilder.group({
        customerPayId: [this.editData.customerPayId],
        customerName: ['', Validators.required],
        amount: ['', Validators.required],
        date: ['',Validators.required],
        description: [''],
      });
    }
  }

  editCustomerPayForm() {
    this.actionBtnName = 'Güncelle';
    this.dialogTitle = 'Firma Ödemesi Güncelle';
    this.customerPayForm.controls['customerName'].setValue(this.editData.customerName);
    this.customerPayForm.controls['amount'].setValue(this.editData.amount);
    this.customerPayForm.controls['date'].setValue(this.editData.date);
    this.customerPayForm.controls['description'].setValue(this.editData.description);
  }

  add() {

    if (!this.editData) {
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
    }
    else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }

}
