import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators, FormControl} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ExpenditureViewComponent>,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {

    if (this.editData.status) {
      this.dateNow = new FormControl(
        moment().format('YYYY-MM-DD'),
        Validators.required
      );
      this.dateInput = this.dateNow.value;
      this.actionBtnName = 'Kaydet';
      this.dialogTitle = 'Masraf Ekle';
    } else if (!this.editData.status) {
      this.dateNow = new FormControl(
        this.editData.data.date,
        Validators.required
      );
      this.dateInput = this.editData.data.date;
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Masraf Güncelle';
    }
    this.getForms();

  }

  getForms() {
    this.createExpenditureForm();
    if (!this.editData.status) {
      this.editExpenditureForm();
    }
  }

  addEvent(event: any) {
    let a: Moment = event.value;
    this.dateInput = a.format('YYYY-MM-DD');
    this.getForms();
  }

  createExpenditureForm() {
    if (this.editData.status)  {
      this.expenditureForm = this.formBuilder.group({
        userId: [this.editData.userId],
        amount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    }  else if (!this.editData.status){
      this.expenditureForm = this.formBuilder.group({
        expenditureId: [this.editData.data.expenditureId],
        userId: [this.editData.data.userId],
        amount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    }
  }

  editExpenditureForm() {
    this.expenditureForm.controls['amount'].setValue(this.editData.data.amount);
    this.expenditureForm.controls['description'].setValue(this.editData.data.description);
  }

  add() {
    if (this.editData.status) {
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
    }  else if (!this.editData.status) {
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
