import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { MoneyOutputService } from 'src/app/services/money-output.service';
import { UserService } from 'src/app/services/user.service';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;
@Component({
  selector: 'app-money-output-transactions-view',
  templateUrl: './money-output-transactions-view.component.html',
  styleUrls: ['./money-output-transactions-view.component.scss'],
})
export class MoneyOutputTransactionsViewComponent {
  users: User[] = [];
  userStatus: boolean = true;
  moneyOutputForm: FormGroup;
  dateNow: FormControl;
  dateInput: any;
  actionBtnName: string;
  dialogTitle: string;
  status: boolean = true;

  constructor(
    private userService: UserService,
    private moneyOutpuService: MoneyOutputService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MoneyOutputTransactionsViewComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    this.getAllUserByStatus();
    if (this.data.status) {
      this.dateNow = new FormControl(this.data.date, Validators.required);
      this.dateInput = this.dateNow.value;
      this.actionBtnName = 'Kaydet';
      this.dialogTitle = 'Kasa Çıkışı Ekle';
    } else if (!this.data.status) {
      this.dateNow = new FormControl(this.data.row.date, Validators.required);
      this.dateInput = this.data.row.date;
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Kasa Çıkışı Güncelle';
    }
    this.getForms();
  }

  getAllUserByStatus() {
    this.userService
      .getAllUserByStatus(this.userStatus)
      .subscribe((response) => {
        this.users = response.data;
      });
  }

  getForms() {
    this.createMoneyOutputForm();
    if (!this.data.status) {
      this.editMoneyOutputForm();
    }
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.getForms();
  }

  createMoneyOutputForm() {
    if (this.data.status) {
      this.moneyOutputForm = this.formBuilder.group({
        userId: ['', Validators.required],
        totalAmount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    } else if (!this.data.status) {
      this.moneyOutputForm = this.formBuilder.group({
        moneyOutputId: [this.data.row.moneyOutputId],
        userId: ['', Validators.required],
        totalAmount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    }
  }

  editMoneyOutputForm() {
    this.moneyOutputForm.controls['userId'].setValue(this.data.row.userId);
    this.moneyOutputForm.controls['totalAmount'].setValue(
      this.data.row.totalAmount
    );
    this.moneyOutputForm.controls['description'].setValue(
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
    if (this.moneyOutputForm.valid) {
      let moneyOutputModel = Object.assign({}, this.moneyOutputForm.value);
      this.moneyOutpuService.add(moneyOutputModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.moneyOutputForm.reset();
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
    if (this.moneyOutputForm.valid) {
      let moneyOutputModel = Object.assign({}, this.moneyOutputForm.value);
      this.moneyOutpuService.update(moneyOutputModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.moneyOutputForm.reset();
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
