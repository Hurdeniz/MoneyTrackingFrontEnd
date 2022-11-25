import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { CancellationService } from 'src/app/services/cancellation.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-cancellation-view',
  templateUrl: './cancellation-view.component.html',
  styleUrls: ['./cancellation-view.component.scss'],
})
export class CancellationViewComponent implements OnInit {
  users: User[] = [];
  cancellationForm: FormGroup;
  dateNow: FormControl;
  dateInput: any;
  userStatus: boolean = true;
  actionBtnName: string;
  dialogTitle: string;

  constructor(
    private userService: UserService,
    private cancellationService: CancellationService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CancellationViewComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUserByStatus();
    if (this.data.status) {
      this.dateNow = new FormControl(
        moment().format('YYYY-MM-DD'),
        Validators.required
      );
      this.dateInput = this.dateNow.value;
      this.actionBtnName = 'Kaydet';
      this.dialogTitle = 'İptal İşlemi Ekle';
    } else if (!this.data.status) {
      this.dateNow = new FormControl(this.data.row.date, Validators.required);
      this.dateInput = this.data.row.date;
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'İptal İşlemi Güncelle';
    }
    this.getForms();
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.cancellationForm.controls['date'].setValue(this.dateInput);
  }

  getAllUserByStatus() {
    this.userService
      .getAllUserByStatus(this.userStatus)
      .subscribe((response) => {
        this.users = response.data;
      });
  }

  getForms() {
    this.createCancellationForm();
    if (!this.data.status) {
      this.editCancellationForm();
    }
  }

  createCancellationForm() {
    if (this.data.status) {
      this.cancellationForm = this.formBuilder.group({
        userId: ['', Validators.required],
        customerCode: ['', Validators.required],
        customerNameSurname: ['', Validators.required],
        promissoryNumber: ['', Validators.required],
        transactionAmount: ['', Validators.required],
        cancellationAmount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    } else if (!this.data.status) {
      this.cancellationForm = this.formBuilder.group({
        cancellationId: [this.data.row.cancellationId],
        userId: ['', Validators.required],
        customerCode: ['', Validators.required],
        customerNameSurname: ['', Validators.required],
        promissoryNumber: ['', Validators.required],
        transactionAmount: ['', Validators.required],
        cancellationAmount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    }
  }

  editCancellationForm() {
    this.cancellationForm.controls['userId'].setValue(this.data.row.userId);
    this.cancellationForm.controls['customerCode'].setValue(
      this.data.row.customerCode
    );
    this.cancellationForm.controls['customerNameSurname'].setValue(
      this.data.row.customerNameSurname
    );
    this.cancellationForm.controls['promissoryNumber'].setValue(
      this.data.row.promissoryNumber
    );
    this.cancellationForm.controls['transactionAmount'].setValue(
      this.data.row.transactionAmount
    );
    this.cancellationForm.controls['cancellationAmount'].setValue(
      this.data.row.cancellationAmount
    );
    this.cancellationForm.controls['description'].setValue(
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
    if (this.cancellationForm.valid) {
      let cancellationModel = Object.assign({}, this.cancellationForm.value);
      this.cancellationService.add(cancellationModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.cancellationForm.reset();
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
    if (this.cancellationForm.valid) {
      let cancellationModel = Object.assign({}, this.cancellationForm.value);
      this.cancellationService.update(cancellationModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.cancellationForm.reset();
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
