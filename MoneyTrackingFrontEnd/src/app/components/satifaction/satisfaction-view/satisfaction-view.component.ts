import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SatisfactionService } from 'src/app/services/satisfaction.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-satisfaction-view',
  templateUrl: './satisfaction-view.component.html',
  styleUrls: ['./satisfaction-view.component.scss'],
})
export class SatisfactionViewComponent implements OnInit {
  satisfactionEditForm: FormGroup;
  dateNow: FormControl;
  dateInput: any;

  constructor(
    private satisfactionService: SatisfactionService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<SatisfactionViewComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dateNow = new FormControl(
      moment().format('YYYY-MM-DD'),
      Validators.required
    );
    this.dateInput = this.dateNow.value;
    this.getForms();
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.satisfactionEditForm.controls['date'].setValue(this.dateInput);
  }

  getForms() {
    this.createSatisfactionForm();
    this.editSatisfactionForm();
  }



  createSatisfactionForm() {
    this.satisfactionEditForm = this.formBuilder.group({
      satisfactionId: [this.editData.satisfactionId],
      customerCode: ['', Validators.required],
      customerNameSurname: ['', Validators.required],
      promissoryNumber: ['', Validators.required],
      phone: ['', Validators.required],
      date: [this.dateInput, Validators.required],
      result: ['', Validators.required],
    });
  }

  editSatisfactionForm() {
    this.satisfactionEditForm.controls['customerCode'].setValue(
      this.editData.customerCode
    );
    this.satisfactionEditForm.controls['customerNameSurname'].setValue(
      this.editData.customerNameSurname
    );
    this.satisfactionEditForm.controls['promissoryNumber'].setValue(
      this.editData.promissoryNumber
    );
    this.satisfactionEditForm.controls['phone'].setValue(this.editData.phone);
    this.satisfactionEditForm.controls['result'].setValue(this.editData.result);
  }

  update() {
    if (this.satisfactionEditForm.valid) {
      let satisfactionModel = Object.assign(
        {},
        this.satisfactionEditForm.value
      );
      this.satisfactionService.update(satisfactionModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.satisfactionEditForm.reset();
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
