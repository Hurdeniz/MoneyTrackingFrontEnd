import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CentralPayService } from 'src/app/services/central-pay.service';

@Component({
  selector: 'app-central-pay-view',
  templateUrl: './central-pay-view.component.html',
  styleUrls: ['./central-pay-view.component.scss']
})
export class CentralPayViewComponent implements OnInit {
  centralPayForm: FormGroup;
  actionBtnName = 'Kaydet';
  dialogTitle = 'Merkez Ödemesi Ekle';

  constructor(
    private centralPayService: CentralPayService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<CentralPayViewComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createCentralPayForm();
    if (this.editData) {
      this.editCentralPayForm();
    }
  }

  createCentralPayForm() {
    if (!this.editData) {
      this.centralPayForm = this.formBuilder.group({
        amount: ['', Validators.required],
        date:['',Validators.required],
        description: [''],
      });
    } else {
      this.centralPayForm = this.formBuilder.group({
        centralPayId: [this.editData.centralPayId],
        amount: ['', Validators.required],
        date: ['',Validators.required],
        description: [''],
      });
    }
  }

  editCentralPayForm() {
    this.actionBtnName = 'Güncelle';
    this.dialogTitle = 'Merkez Ödemesi Güncelle';
    this.centralPayForm.controls['amount'].setValue(this.editData.amount);
    this.centralPayForm.controls['date'].setValue(this.editData.date);
    this.centralPayForm.controls['description'].setValue(this.editData.description);
  }

  add() {

    if (!this.editData) {
      if (this.centralPayForm.valid) {
        let centralPayModel = Object.assign({}, this.centralPayForm.value);
        this.centralPayService.add(centralPayModel).subscribe(
          (response) => {

            this.toastrService.success(response.message, 'Başarılı');
            this.centralPayForm.reset();
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
    if (this.centralPayForm.valid) {
      let centralPayModel = Object.assign({}, this.centralPayForm.value);
      this.centralPayService.update(centralPayModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.centralPayForm.reset();
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
