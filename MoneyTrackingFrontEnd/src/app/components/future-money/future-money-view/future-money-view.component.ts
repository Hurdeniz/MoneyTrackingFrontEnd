import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FutureMoneyService } from 'src/app/services/future-money.service';

@Component({
  selector: 'app-future-money-view',
  templateUrl: './future-money-view.component.html',
  styleUrls: ['./future-money-view.component.scss']
})
export class FutureMoneyViewComponent implements OnInit {
  futureMoneyForm:FormGroup
  actionBtnName = 'Kaydet';
  dialogTitle = 'E-Gelecek Ekle';
  isAuthenticated: boolean = false;
  status:boolean=true;
  userId: number;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private futureMoneyService:FutureMoneyService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<FutureMoneyViewComponent>,
    private toastrService: ToastrService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.refresh
    this.createFutureMoneyForm();



    if (this.editData) {
      this.editFutureMoneyForm();
    }
  }


  refresh() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let userName = Object.keys(decode).filter((x) => x.endsWith('/name'))[0];
      let userId = Object.keys(decode).filter((x) =>
        x.endsWith('/nameidentifier')
      )[0];
      this.userId = decode[userId];

    }
  }



  createFutureMoneyForm() {
    if (!this.editData) {
      this.futureMoneyForm = this.formBuilder.group({
        userId: ['1'],
        typeOfOperation:['',Validators.required],
        customerCode: ['', Validators.required],
        customerName: ['', Validators.required],
        promissoryNoteNumber:['',Validators.required],
        transactionAmount:['',Validators.required],
        amountPaid:['',Validators.required],
        futureAmount:['',Validators.required],
        futureMoneyRegistrationDate:['',Validators.required],
        description: [''],
        status:[this.status],
      });
    } else {
      this.futureMoneyForm = this.formBuilder.group({
        futureMoneyId: [this.editData.futureMoneyId],
        userId: [this.editData.userId],
        typeOfOperation:['',Validators.required],
        customerCode: ['', Validators.required],
        customerName: ['', Validators.required],
        promissoryNoteNumber:['',Validators.required],
        transactionAmount:['',Validators.required],
        amountPaid:['',Validators.required],
        futureAmount:['',Validators.required],
        futureMoneyRegistrationDate:['',Validators.required],
        description: [''],
        status:[this.editData.status],
      });
    }
  }


  editFutureMoneyForm() {
    this.actionBtnName = 'Güncelle';
    this.dialogTitle = 'E-Gelecek Güncelle';
    this.futureMoneyForm.controls['typeOfOperation'].setValue(this.editData.typeOfOperation);
    this.futureMoneyForm.controls['customerCode'].setValue(this.editData.customerCode);
    this.futureMoneyForm.controls['customerName'].setValue(this.editData.customerName);
    this.futureMoneyForm.controls['promissoryNoteNumber'].setValue(this.editData.promissoryNoteNumber);
    this.futureMoneyForm.controls['transactionAmount'].setValue(this.editData.transactionAmount);
    this.futureMoneyForm.controls['amountPaid'].setValue(this.editData.amountPaid);
    this.futureMoneyForm.controls['futureAmount'].setValue(this.editData.futureAmount);
    this.futureMoneyForm.controls['futureMoneyRegistrationDate'].setValue(this.editData.futureMoneyRegistrationDate);
    this.futureMoneyForm.controls['description'].setValue(this.editData.description);

  }



  add() {

    if (!this.editData) {
      if (this.futureMoneyForm.valid) {
        let futureMoneyModel = Object.assign({}, this.futureMoneyForm.value);
        this.futureMoneyService.add(futureMoneyModel).subscribe(
          (response) => {

            this.toastrService.success(response.message, 'Başarılı');
            this.futureMoneyForm.reset();
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
    if (this.futureMoneyForm.valid) {
      let futureMoneyModel = Object.assign({}, this.futureMoneyForm.value);
      this.futureMoneyService.update(futureMoneyModel).subscribe(

        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.futureMoneyForm.reset();
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
