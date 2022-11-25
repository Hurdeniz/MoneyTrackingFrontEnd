import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators, FormControl} from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { ExpenditureService } from 'src/app/services/expenditure.service';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-expenditure-view',
  templateUrl: './expenditure-view.component.html',
  styleUrls: ['./expenditure-view.component.scss']
})
export class ExpenditureViewComponent implements OnInit {
  expenditureForm:FormGroup;
  dateNow: FormControl;
  dateInput: any;
  actionBtnName: string;
  dialogTitle: string;


  constructor(
    private expenditureService:ExpenditureService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ExpenditureViewComponent>,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {

    if (this.data.status) {
      this.dateNow = new FormControl(
        moment().format('YYYY-MM-DD'),
        Validators.required
      );
      this.dateInput = this.dateNow.value;
      this.actionBtnName = 'Kaydet';
      this.dialogTitle = 'Masraf Ekle';
    } else if (!this.data.status) {
      this.dateNow = new FormControl(
        this.data.row.date,
        Validators.required
      );
      this.dateInput = this.data.row.date;
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Masraf Güncelle';
    }
    this.getForms();

  }

  getForms() {
    this.createExpenditureForm();
    if (!this.data.status) {
      this.editExpenditureForm();
    }
  }

  addEvent(event: any) {
    let a: Moment = event.value;
    this.dateInput = a.format('YYYY-MM-DD');
    this.getForms();
  }

  createExpenditureForm() {
    if (this.data.status)  {
      this.expenditureForm = this.formBuilder.group({
        userId: [this.data.userId],
        amount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    }  else if (!this.data.status){
      this.expenditureForm = this.formBuilder.group({
        expenditureId: [this.data.row.expenditureId],
        userId: [this.data.row.userId],
        amount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    }
  }

  editExpenditureForm() {
    this.expenditureForm.controls['amount'].setValue(this.data.row.amount);
    this.expenditureForm.controls['description'].setValue(this.data.row.description);
  }

  add() {
    if (this.data.status) {
      if (this.expenditureForm.valid) {
        let expenditureModel = Object.assign({}, this.expenditureForm.value);
        this.expenditureService.add(expenditureModel).subscribe(
          (response) => {

            this.toastrService.success(response.message, 'Başarılı');
            this.expenditureForm.reset();
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
    }  else if (!this.data.status) {
      this.update();
    }
  }

  update() {
    if (this.expenditureForm.valid) {
      let expenditureModel = Object.assign({}, this.expenditureForm.value);
      this.expenditureService.update(expenditureModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.expenditureForm.reset();
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
