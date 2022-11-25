import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { MonetaryDeficitService } from 'src/app/services/monetary-deficit.service';

@Component({
  selector: 'app-monetary-deficit-view',
  templateUrl: './monetary-deficit-view.component.html',
  styleUrls: ['./monetary-deficit-view.component.scss']
})
export class MonetaryDeficitViewComponent implements OnInit {
  monetaryDeficitForm: FormGroup;
  actionBtnName = 'Kaydet';
  dialogTitle = 'Kasa Açığı Ekle';
  status : Boolean=true;

  constructor(
    private monetaryDeficitService: MonetaryDeficitService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<MonetaryDeficitViewComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createMonetaryDeficitForm();
    if (this.editData) {
      this.editMonetaryDeficitForm();
    }
  }

  createMonetaryDeficitForm() {
    if (!this.editData) {
      this.monetaryDeficitForm = this.formBuilder.group({
        nameSurname: ['', Validators.required],
        amount: ['', Validators.required],
        date:['',Validators.required],
        description: [''],
        status:[this.status],
      });
    } else {
      this.monetaryDeficitForm = this.formBuilder.group({
        monetaryDeficitId: [this.editData.monetaryDeficitId],
        nameSurname: ['', Validators.required],
        amount: ['', Validators.required],
        date: ['',Validators.required],
        description: [''],
        status:[this.editData.status],
      });
    }
  }

  editMonetaryDeficitForm() {
    this.actionBtnName = 'Güncelle';
    this.dialogTitle = 'Kasa Açığı Güncelle';
    this.monetaryDeficitForm.controls['nameSurname'].setValue(this.editData.nameSurname);
    this.monetaryDeficitForm.controls['amount'].setValue(this.editData.amount);
    this.monetaryDeficitForm.controls['date'].setValue(this.editData.date);
    this.monetaryDeficitForm.controls['description'].setValue(this.editData.description);
  }

  add() {

    if (!this.editData) {
      if (this.monetaryDeficitForm.valid) {
        let monetaryDeficitModel = Object.assign({}, this.monetaryDeficitForm.value);
        this.monetaryDeficitService.add(monetaryDeficitModel).subscribe(
          (response) => {

            this.toastrService.success(response.message, 'Başarılı');
            this.monetaryDeficitForm.reset();
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
    if (this.monetaryDeficitForm.valid) {
      let monetaryDeficitModel = Object.assign({}, this.monetaryDeficitForm.value);
      this.monetaryDeficitService.update(monetaryDeficitModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.monetaryDeficitForm.reset();
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
