import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CentralPayService } from 'src/app/services/central-pay.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-central-pay-view',
  templateUrl: './central-pay-view.component.html',
  styleUrls: ['./central-pay-view.component.scss'],
})
export class CentralPayViewComponent implements OnInit {
  centralPayForm: FormGroup;
  dateNow: FormControl;
  dateInput: any;
  actionBtnName: string;
  dialogTitle: string;

  constructor(
    private centralPayService: CentralPayService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CentralPayViewComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.data.status) {
      this.dateNow = new FormControl(
        moment().format('YYYY-MM-DD'),
        Validators.required
      );
      this.dateInput = this.dateNow.value;
      this.actionBtnName = 'Kaydet';
      this.dialogTitle = 'Merkez Ödemesi Ekle';
    } else if (!this.data.status) {
      this.dateNow = new FormControl(this.data.row.date, Validators.required);
      this.dateInput = this.data.row.date;
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Merkez Ödemesi Güncelle';
    }
    this.getForms();
  }

  getForms() {
    this.createCentralPayForm();
    if (!this.data.status) {
      this.editCentralPayForm();
    }
  }

  addEvent(event: any) {
    let a: Moment = event.value;
    this.dateInput = a.format('YYYY-MM-DD');
    this.centralPayForm.controls['date'].setValue(this.dateInput);
  }

  createCentralPayForm() {
    if (this.data.status) {
      this.centralPayForm = this.formBuilder.group({
        amount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    } else if (!this.data.status) {
      this.centralPayForm = this.formBuilder.group({
        centralPayId: [this.data.row.centralPayId],
        amount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    }
  }
  editCentralPayForm() {
    this.centralPayForm.controls['amount'].setValue(this.data.row.amount);
    this.centralPayForm.controls['description'].setValue(
      this.data.row.description
    );
  }

  statusControl() {
    if (this.data.status) {
      this.add();
    } else if (!this.data.status) {
      this.update();
    }
  }

  add() {
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
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }
}
